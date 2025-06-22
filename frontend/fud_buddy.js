import asyncio
import json
from datetime import datetime
from pywaku import WakuRelay, WakuMessage

# Static mock meal options based on fake location
MEALS = [
    {"id": "#a1", "name": "Kimchi Burger", "desc": "Spicy beef, fermented crunch."},
    {"id": "#a2", "name": "Veggie Banh Mi", "desc": "Crispy tofu, pickled carrot, vegan mayo."},
    {"id": "#a3", "name": "Chicken Shawarma", "desc": "Halal marinated chicken, garlic sauce."},
    {"id": "#a4", "name": "Thai Green Curry", "desc": "Spicy coconut broth with veggies."}
]

async def publish_meal_options():
    relay = WakuRelay()
    await relay.start()

    print("🤖 FUD Buddy online. Publishing lunch options to Waku...")

    message = {
        "type": "lunch-options",
        "location": "ethcc",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "options": MEALS
    }

    encoder = await relay.get_encoder("/lunchcell/2025-06-21/ethcc/options", "json")
    await relay.relay.send(encoder, {"payload": json.dumps(message)})
    print("✅ Lunch options published.")

    await relay.stop()

if __name__ == "__main__":
    asyncio.run(publish_meal_options())
