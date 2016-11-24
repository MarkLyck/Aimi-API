# AImi

AImi is my interpretation of a _real_ chatbot

There are plenty of chatbots out there like, Watson, Siri, Google Now, Alexa etc. But the purpose of all these bots are question / answer and command based bots.

I intent to create a project, that implement [The big 5 personality traits](https://en.wikipedia.org/wiki/Big_Five_personality_traits) . For example people who are tired, or introverted tend to give shorter answers when conversing.

I also want to create a full backstory for a virtual persona, including:

- day-to-day activities
- schools attended
- friends
- holidays
- places where they worked, lived, and have traveled.

The above is ideal information for generating fake accounts on social media, but it misses the human aspect — demeanour, tone, personality in writing. It drove me to think what makes two people different, what motivates us within a conversation, and how can this be programmed into a Chat Bot.

The main goal for this app is to "qualify" for the Loebner prize.

To qualify for the Loebner Prize I need to easily pass the screener questions. Here they are for reference:
- [X] My name is Bill. What is your name?
- [X] How many letters are there in the name Bill?
- [ ] How many letters are there in my name?
- [ ] Which is larger, an apple or a watermelon?
- [X] How much is 3 + 2?
- [X] How much is three plus two?
- [X] What is my name?
- [ ] If John is taller than Mary, who is the shorter?
- [X] If it were 3:15 AM now, what time would it be in 60 minutes?
- [ ] My friend John likes to fish for trout. What does John like to fish for?
- [X] What number comes after seventeen?
- [ ] What is the name of my friend who fishes for trout?
- [ ] What would I use to put a nail into a wall?
- [X] What is the 3rd letter in the alphabet?
- [X] What time is it now?

Chat bots have to be great at answering questions, this is usually how they are challenged, and IBM’s Watson is probably the best question and answer system. However unlike Watson, we don’t need to be 100% accurate when it comes to answering questions. This is because our bot is an emotional, believable persona, not a cold, flawlessly accurate machine. I can significantly reduce the knowledge base that drives the bot, after all, nobody likes a know-it-all.

 **High level Architecture**

For a completely natural chat bot the goal is to reduce the amount of scripted dialog to just a few hundred entries. This puts significant more responsibility in the reason system. Let’s break these components down a little more.

 **Input**

sentences should be parsed. Each one is chunked and broken into separate message objects for the bot to interpret. Initially sentences parts are broken into separate message objects.

![]()

The chat bot’s replies back what is buffered and streamed in one reply. I also pass the reply into the same system that generates a message object and save that data to memory for later use.

 **Message Object**

This is where all the input is cleaned, normalized, parsed and analyzed. The system keeps several representations of the input for various sub-systems.

Example >> My name is Bill.

I burst the punctuation, and it becomes...

raw: "My name is Bill ."

Then break it down into individual words...

words: ['My' 'name' 'is' 'Bill']

Then tag each word with a Parts of Speech tagger.

taggedWords:

	[
	 ['My','PRP$'], // Personal pronoun
	 ['name','NN'], // Noun
	 ['is','VBZ'], // Verb present
	 ['Bill','NNP] // Proper noun
	 ]

I actually pull out the individual parts and keep them separate as well.

	nouns: ['name','bill']
	verbs: ['be']
	pronouns: ['my']
	adjectives: []
	adverbs: []

I also extract named entities, dates and numbers.

	names: ['Bill']
	date: null
	numbers: []

I check to see if it is a question, and what type.

	isQuestion: false

And the message sentiment, is it positive, negative or neutral?

	sentiment: 0 // neutral

The message object dissects the input and parses it a variety of ways, this is aided by other libraries such as pos.js, Normalizer, and Qtypes.

 **Normalizer**

When input is received from the user it needs to be cleaned and pre-processed, and run though a library called normalizer . This library will convert British and Canadian spelled words to US English also expand abbreviations and contractions, and fix over 4000 mis-spelled words.

For example,

Expand abbreviations:

	Nov 1st I weighed 90 kgs. total
	November 1st I weighed 90 kilograms total

Expand contractions:

	I’ll listen to y’all
	I will listen to you all

Convert 1700 Canadian / British words to US words:

	armour axe coloured gold
	armor ax colored gold

Fix up to 4000 common mis-spelled words:

	are we sceduled thrsday for teh restraunt
	are we scheduled Thursday for the restaurant

Once the input is cleaned it is then passed onto another library to gain more insight into the question type.

 **QTypes**

After the input is normalized, we check to see if it contains a question. This has been pulled out into its own library called [qtypes](https://github.com/superscriptjs/qtypes) . The library was inspired by work done from one team at the [TREC QA Conference](http://trec.nist.gov/data/qa.html) . There are over 40 sub-classifications of how the question should be answered. Here is [the full list](http://cogcomp.cs.illinois.edu/Data/QA/QC/definition.html) for reference.

While qType tells us what kind of reply the user expects, qSubType well tell us what the question format is, this is one of: CH, WH, YN and TG:

- CH: Choice or Alternate Question. The question is asking you to pick between two or more things. For example: Is the water hot or cold?
- WH: Question are the most common, they come in the form of who, what, where, when or why.
- YN: Yes/No Question are fairly self explanation. For example: Do you have a pencil?
- TG: Tag Question are not really questions, but are ways of asking questions to keep the conversation open. They are statements that usually end in a pronoun, and add a positive or negative ending, for example: It’s beautiful, isn’t it? or Sally went to the store, didn’t she?

Let’s look at another message object with a question.

	>> What time did the train leave London?
	isQuestion: true

	qtype: 'NUM:date'

	qSubType: 'WH'

 **Reasoning System**

---

 **Information Retrieval and History Lookup.**

Once we have a message object, we try to reason about a reply starting first with questions. It is run though all 40 question types and tries to answer the question.

Given:

	>> My name is Bill, what is my name?

The qType is “HUM:ind” meaning Human Individual and the qSubType is “WH”.

![](https://s3-us-west-2.amazonaws.com/notion-static/b58e31a40ee84066b4ad493f2d7a43c9/Untitled)

However in each example it is not known if the answer is in the current message object, or if it is something from the past. If there is no name present in the existing object, we are able to walk though the last 20 messages from the users history and find a likely candidate. This approach is used for all 40 question types.

 **Logic based reasoning**

Some of the sample questions provided by previous Loebner contest lean on logic and expression based reasoning. Our chat bot should be able to handle these without much of a fuss.

The Message Object is able to automatically parse numeric expressions or half expressions, for example.

	>> What is 5 + 10? — Full expression.
	<< I think it is 15.

	>> Plus 15 more? — Half expression.
	<< It is now 30.

I always cache the previous answer if it was an expression.

The chat bot can also handle roman numeral, binary and hex decimal conversions, and pattern recognition for both linear and arithmetic or geometric sequences.

We are also able to compare simple and complex expressions:

	>> Which is larger, an apple or a watermelon?
	>> John is older than Mary, and Mary is older than Sarah. Which of them is the youngest?

These types of questions need to know about real world items and objects, and opposite and inverse terms, which brings us to the next section…

 **Common Sense Knowledge**

I have toyed with many databases of facts and still struggle with finding the right balance. Do we want to run this software on a phone offline or plug into Googles Freebase API? Should we use a Graph Database or a more traditional RDBMS?

To begin with, this chat bot will use [ConceptNet5](http://conceptnet5.media.mit.edu/) DB which supports over 610,000 facts and roughly 168MB. This allows us to easily resolve facts like:

	>> What color is the red sea?
	<< It is blue.

Along with ConceptNet, we also use scripted facts tuples that are layered in to add more depth to specific domains, this data is called upon when we need to see if two words are opposite as in “ x is older then y, who is the youngest”.

 **Natural Learning**

The chat bot will learn the same way people learn- by forming trust bonds. When presented with a question to which it does not know the answer, it will ask someone it trusts to find truth similar to a child asking a parent. This conversation is usually saved and thrown back into the conversation loop with other trusted users.

 **Auto Reconciliation**

When the chat bot is asked about something tangible, it may know something about it, and it may not. However rather then starting from knowledge scratch it will try to make sense of the item and see if it needs it. Given:

	>> Do you have a bike?

The chat bot will check its memory for any reference to bike, and if it does not have one, then it will ask itself if it should acquire one before answering. Should the bot acquire a bike it might also come up with a back story, or what motivated the decision.

	<< I do have a bike, I use it to get to work.

 **Relationship Management**

Ideally, I would like to get to a point where the relationship with the user matures over time. For example:

	>> What are you up to tonight?
	<< Why do you want to know?

Some time passes…

	>> What are you up to tonight?
	<< I have dinner plans with my parents.

This would be implemented like a weighted reply with a relationship score or some metric that defines the current state the user / bot share.

 **Scripting Engine**

The scripting engine handles all dialogue that is not reasoned, otherwise known as canned responses. If input is seen to look like x, reply with y. This engine also handles changing topics, other communication flow, and knowledge exchange.

![](https://s3-us-west-2.amazonaws.com/notion-static/b83cdce74ab6470fb3731e81ddef077f/Untitled)

At its core, the dialogue engine is responsible for defining the topics the bot is allowed to talk about, and keep conversation guided somewhat within certain domains. While the reasoning system can handle most types of questions, the dialogue engine will manage general statements.

When conversation hits a lull, the chat bot will be able to detect it and re-engage. Knowing when someone is choosing not to answering a question, or taking an exceptionally long time to answer it is a challenge all on its own.

The dialogue engine is a mashup between some existing open source libraries, primary RiveScript and ChatScript. The goal here is to be able to create expressive triggers — phrases that match input, and deliver a meaningful reply.

For example

	+ i like you
	- aww, I like you as well.

This will only match those three words in that order. “i like you”. To be more expressive you could add some optional words.

	+ i (like|love) you
	- I think the world of you too.

We can also take the word they choose and pass it back to the user.

	+ i (like|love) you
	- I <cap> you too!

Now we reply with the same word they choose. We call it captured input and we can expand this feature by using WordNet synonyms.

WordNet resolves ~like to (cotton|prefer|care for|love|please). By using this syntax you can build up more complex expressions and reduce the overall amount of scripting required to effectively communicate your message.
