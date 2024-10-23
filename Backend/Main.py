# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("text2text-generation", model="facebook/blenderbot-400M-distill")

response = "You look very ugly, what is wrong with you?"
result = pipe(response)
print(result)