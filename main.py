import logging
from telegram.ext import Updater, MessageHandler, Filters
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

logging.basicConfig(level=logging.INFO)
TOKEN = "8042413022:AAFtd472E_WhPhmZlfKRug3a4Mhj5xkRis4"

tokenizer = AutoTokenizer.from_pretrained("./modelo")
model = AutoModelForCausalLM.from_pretrained("./modelo")

def responder(update, context):
    entrada = update.message.text
    input_ids = tokenizer.encode(entrada, return_tensors="pt")

    with torch.no_grad():
        output = model.generate(input_ids, max_length=80, do_sample=True)
    texto = tokenizer.decode(output[0], skip_special_tokens=True)

    update.message.reply_text(texto)

if __name__ == "__main__":
    updater = Updater(TOKEN, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(MessageHandler(Filters.text & ~Filters.command, responder))

    updater.start_polling()
    updater.idle()
