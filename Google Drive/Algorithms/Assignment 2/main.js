var tree = {    //Dictionaries!
    word: "",
    included: false, //This is how we keep track of seeing if the node itself is included in the node
};

function loadWord(word) {
    word = word.toLowerCase();
    //create pointer to our root node
    var node = tree;
    for(var i = 0; i < word.length; i++){
        var ch = word[i];
        if (node[ch] === undefined) {
            var child = {
                word: node.word + ch, //if the node doesnt exist, create a new node 
            } 
            node[ch] = child;
            node = child;        
        }
        else{
            node = node[ch]
        }

    }

    //If the root is not in the tree, then include it in the tree.
    if(node !== tree){
        node.included = true;
    }
}

console.log(tree);

const alphabet = "abcdefghijklmnopqrstuvwxyz"
function allWords(node, words){
    if (!words) { words = []}
    if (!node){ return }
    if(node.included){
        words.push(node.word)
    }
    for(var i = 0; i < 26; i++){  
        allWords(node[alphabet[i]], words)
    }
    return words
}

function getNode(word){
    var node = tree;
    word = word.toLowerCase();
    for(var i = 0; i < word.length; i++){
        var ch = word[i]
        node = node[ch];
        if(!node){return null}
    }
    return node;
}

function buildPredictions(){
    $("#predictions").html("");
    var entry = $("#entry").val().toLowerCase()
    var node = getNode(entry);
    console.log("Got entry " + entry + " and node: ")
    console.log(node)
    if(!node || entry.length < 3) {
        $("#predictions").text("No Predictions")
    } else {
        var predictions = allWords(node);
        console.log("Got " + predictions.length + " predictions")
        //create a list element and put a word in it
        for(var i = 0; i < predictions.length; i++) {
            var li = $("<li></li>").text(predictions[i]);
            $("#predictions").append(li)
        }
    }
}

//all of this code was debugging in the JS console to see we are getting the output that we want
$(document).ready(function() {
    console.log("We gucci hoochie")
    $("#entry").on("change keyup paste", function(){
        buildPredictions();
    })
    $.get("./words.txt", function(data, status){
        var words = data.split("\n");
        var start = new Date().getTime(); //wanted to have some fun and see how long this giant list would take to load in JavaScript
        console.log("Got " + words.length + " words of type " + typeof(data) + " and status: ",  status)
        console.log()
        for (var i = 0; i < words.length; i++){
            loadWord(words[i]);
        }
        var end = new Date().getTime();
        var time = end - start; //values ranged from 400-800 milliseconds
        console.log("Took " + time + " milliseconds to load" );
        $("#preload").hide();
        $("#stuff").show();

    })
});
$("")
console.log("It loaded Huzzah!");



