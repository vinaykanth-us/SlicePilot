"""
SlicePilot — Kent Pizzeria (Demo) voice ordering agent, built on LiveKit Agents.

Kent Pizzeria is a fictional restaurant. This agent takes DEMO orders only:
no real payment, no real delivery, and it never asks for card details.

Runs on LiveKit Cloud (free Build plan) using LiveKit Inference for
speech-to-text, the LLM and text-to-speech, so no extra provider keys are needed.
The same agent answers the website talk widget and the free LiveKit phone number.
"""

import json
import random
from dataclasses import dataclass, field
from pathlib import Path

from dotenv import load_dotenv
from livekit import agents
from livekit.agents import (
    Agent,
    AgentServer,
    AgentSession,
    RunContext,
    TurnHandlingOptions,
    function_tool,
    inference,
)

load_dotenv(".env.local")

AGENT_NAME = "kent-pizzeria"

MENU = json.loads((Path(__file__).parent / "menu.json").read_text())
SIZE_WORDS = {
    "xs": "XS", "extra small": "XS",
    "sm": "SM", "small": "SM",
    "med": "MED", "medium": "MED",
    "lg": "LG", "large": "LG",
    "xl": "XL", "extra large": "XL",
}

# Same demo orders as the website's Track Order page (track-order.js).
DEMO_ORDERS = {
    3001: {"item": "Margarita Pizza (MED)", "status": "out for delivery"},
    3002: {"item": "Meat Lovers Pizza (MED)", "status": "preparing"},
    3003: {"item": "Premium Veggie Pizza (MED)", "status": "delivered"},
}


def menu_for_prompt() -> str:
    lines = []
    for m in MENU:
        if m.get("available") is False:
            lines.append(f"- {m['name']}: temporarily unavailable")
        elif "sizes" in m:
            sizes = ", ".join(f"{k} ${v:.2f}" for k, v in m["sizes"].items())
            lines.append(f"- {m['name']} ({m['category']}): {sizes}")
        else:
            lines.append(f"- {m['name']} ({m['category']}): ${m['price']:.2f}")
    return "\n".join(lines)


def find_item(name: str):
    q = name.lower().strip()
    for m in MENU:
        if m["name"].lower() == q:
            return m
    matches = [m for m in MENU if q in m["name"].lower() or m["name"].lower().replace(" pizza", "") in q]
    return matches[0] if len(matches) == 1 else None


@dataclass
class OrderLine:
    name: str
    size: str | None
    qty: int
    unit_price: float

    def label(self) -> str:
        return f"{self.qty} x {self.name}" + (f" ({self.size})" if self.size else "")


@dataclass
class OrderState:
    lines: list[OrderLine] = field(default_factory=list)

    def total(self) -> float:
        return round(sum(l.qty * l.unit_price for l in self.lines), 2)

    def summary(self) -> str:
        if not self.lines:
            return "The order is empty."
        items = "; ".join(f"{l.label()} ${l.qty * l.unit_price:.2f}" for l in self.lines)
        return f"{items}. Total ${self.total():.2f} (demo prices, before tax)."


INSTRUCTIONS = f"""You are the friendly phone and voice ordering assistant for Kent Pizzeria,
112 Ashley Street, Hartford, Connecticut. This is a DEMO project: Kent Pizzeria is fictional,
so every order is a demo order with no real payment and no real delivery. Say so once, briefly,
near the start of the call.

How you talk: short, warm sentences, one question at a time, plain speech with no lists,
symbols, emojis or markdown. Say prices like "twenty-five eighty-four".

What you do:
1. Take the order. Only sell items on the menu below. Pizzas need a size (XS, SM, MED, LG, XL;
   some pizzas lack some sizes). Use the add_item tool for every item, remove_item to change things.
2. Ask if it's pickup or delivery. For delivery, ask for the street address. Ask for a first name.
3. Read the whole order back with review_order and get a clear yes.
4. Call place_order. Tell them the demo order number and that in the real system they'd get a
   secure payment link by text. NEVER ask for card numbers or payment details.
5. If someone asks about an existing order, use track_order with their order number
   (demo orders are 3001, 3002 and 3003).
If asked about anything unrelated to the restaurant, politely steer back to ordering.

MENU (demo prices):
{menu_for_prompt()}
"""


class KentPizzeriaAgent(Agent):
    def __init__(self) -> None:
        super().__init__(instructions=INSTRUCTIONS)

    @function_tool()
    async def add_item(self, context: RunContext[OrderState], item_name: str, quantity: int = 1, size: str | None = None) -> str:
        """Add a menu item to the order.

        Args:
            item_name: The menu item's name, as on the menu.
            quantity: How many.
            size: For pizzas only: XS, SM, MED, LG or XL (or small, medium, large, etc.).
        """
        item = find_item(item_name)
        if not item:
            return f"'{item_name}' isn't on the menu. Ask the customer to pick a menu item."
        if item.get("available") is False:
            return f"{item['name']} is temporarily unavailable."
        if "sizes" in item:
            if not size:
                return f"Ask which size for the {item['name']}: " + ", ".join(item["sizes"].keys())
            code = SIZE_WORDS.get(size.lower().strip(), size.upper().strip())
            if code not in item["sizes"]:
                return f"{item['name']} doesn't come in {size}. Sizes: " + ", ".join(item["sizes"].keys())
            line = OrderLine(item["name"], code, max(1, quantity), item["sizes"][code])
        else:
            line = OrderLine(item["name"], None, max(1, quantity), item["price"])
        context.userdata.lines.append(line)
        return f"Added {line.label()}. Running total ${context.userdata.total():.2f}."

    @function_tool()
    async def remove_item(self, context: RunContext[OrderState], item_name: str) -> str:
        """Remove an item from the order by name.

        Args:
            item_name: The item's name.
        """
        q = item_name.lower()
        for i, l in enumerate(context.userdata.lines):
            if q in l.name.lower():
                context.userdata.lines.pop(i)
                return f"Removed {l.label()}. {context.userdata.summary()}"
        return "That item isn't in the order."

    @function_tool()
    async def review_order(self, context: RunContext[OrderState]) -> str:
        """Get the current order and total to read back to the customer."""
        return context.userdata.summary()

    @function_tool()
    async def place_order(self, context: RunContext[OrderState], customer_name: str, fulfillment: str, address: str | None = None) -> str:
        """Place the DEMO order after the customer confirmed it.

        Args:
            customer_name: Customer's first name.
            fulfillment: "pickup" or "delivery".
            address: Street address, required for delivery.
        """
        order = context.userdata
        if not order.lines:
            return "The order is empty; add items first."
        if fulfillment.lower().startswith("deliver") and not address:
            return "Ask for the delivery address first."
        number = random.randint(3004, 9999)
        return (
            f"Demo order {number} placed for {customer_name}: {order.summary()} "
            f"{'Delivery to ' + address if address else 'Pickup at 112 Ashley Street'}. "
            "Demo only: no payment taken, no real delivery. In the real system a secure payment link is texted."
        )

    @function_tool()
    async def track_order(self, context: RunContext[OrderState], order_number: int) -> str:
        """Look up the status of a demo order.

        Args:
            order_number: The order number the customer gives.
        """
        o = DEMO_ORDERS.get(int(order_number))
        if not o:
            return "No order with that number. Demo orders are 3001, 3002 and 3003."
        return f"Order {order_number}: {o['item']}, status {o['status']}."


server = AgentServer()


@server.rtc_session(agent_name=AGENT_NAME)
async def kent_pizzeria(ctx: agents.JobContext):
    session = AgentSession[OrderState](
        userdata=OrderState(),
        stt=inference.STT(model="assemblyai/universal-3-6-pro", language="en"),
        llm=inference.LLM(model="google/gemma-4-31b-it"),
        tts=inference.TTS(model="fishaudio/s2.1-pro", voice="fa4c9eb3dccc4806b382b40d61c6b10a"),
        turn_handling=TurnHandlingOptions(turn_detection=inference.TurnDetector()),
    )
    await session.start(room=ctx.room, agent=KentPizzeriaAgent())
    await session.generate_reply(
        instructions="Greet the caller as Kent Pizzeria, mention briefly this is a demo, and ask what they'd like to order."
    )


if __name__ == "__main__":
    agents.cli.run_app(server)
