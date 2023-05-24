from flask import Flask, request, jsonify
from trie import Trie
import re

app = Flask(__name__,static_folder="../client/build", static_url_path="/")
trie = Trie()


@app.route('/spellcheck', methods=['GET'])
def spellcheck():
    # grabs user's input and assigns it to text
    text = request.args.get('text')
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    # ignore characters that are not either whitespaces or letters
    text = re.sub('[^A-Za-z ]+', '', text)

    # empty list will be used to store mispelled words
    misspelled_words = [] 
    # iterates through every word in text
    for word in text.lower().split():
        # checks if word already exist in trie
        if not trie.does_word_exist(word):
            # if not, fetch_word() method checks if word exists by getting its definition from the dictionary API, 
            # word will be added to trie if exist & loop continues
            if trie.fetch_word(word):
                continue
            # if definition cannot be fetched, the word will be added to misspelled_words list
            else:
                misspelled_words.append(word)

    # return all mispelled words 
    if misspelled_words:
        return jsonify({'misspelled_words': misspelled_words}), 200
    else:
        return jsonify({'message': 'All words are spelled correctly!'}), 200

# point to react static files  
@app.route('/')
def index():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(debug=True)
