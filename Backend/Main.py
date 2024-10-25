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
    #print(userinput)
    response = pipe(userinput)


    result = f"{response}"
    result = result[22:-3]
    return jsonify(result)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)

