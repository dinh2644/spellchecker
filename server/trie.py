import requests

class TrieNode:
  def __init__(self, letter):
    self.letter = letter
    self.children = {}
    self.is_end_of_word = False

class Trie:
  def __init__(self):
    self.root = TrieNode("*")
  
  # add word to trie
  def add_word(self, word):
    curr_node = self.root
    for letter in word:
      if letter not in curr_node.children:
        curr_node.children[letter] = TrieNode(letter)
      curr_node = curr_node.children[letter]
    curr_node.is_end_of_word = True
  
  # checks if word exist in trie
  def does_word_exist(self, word):
    if word == "":
      return True
    curr_node = self.root
    for letter in word:
      if letter not in curr_node.children:
        return False
      curr_node = curr_node.children[letter]
    return curr_node.is_end_of_word 

  # fetches word from Merriam-Webster Collegiate Dictionary API to add to trie
  def fetch_word(self, word):
    url = f"https://www.dictionaryapi.com/api/v3/references/collegiate/json/{word}?key=15acd83f-e7fc-4c5c-9d2f-364ee2295ac4"
    response = requests.get(url)
    # 200 refers to a successful api response
    if response.status_code == 200: 
        # attempts to extract the first JSON object from the response and assign it to the data variable
        try:
            data = response.json()[0] 
        except IndexError:
            return False
        # if JSON repsonse has a short definition key, word is valid and will be added to trie
        if "shortdef" in data: 
            self.add_word(word)
            return True
    return False



