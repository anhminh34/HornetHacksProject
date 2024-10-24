# Use a pipeline as a high-level helper
from transformers import pipeline
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
pipe = pipeline("text2text-generation", model="facebook/blenderbot-400M-distill")
CORS(app)

@app.route('/process-input', methods=['POST'])
def process_input():
    data = request.get_json() # Get the JSON from React front end
    userinput = data.get("inputValue")
    print(userinput)
    response = pipe(userinput)
    testinput = "What type of coffee do you like?"
    testresponse = pipe(testinput)

    result = f"Processed input: {testresponse}"
    return jsonify(result)



if __name__ == '__main__':
    app.run(debug=True)
