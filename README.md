# Starshooter
A web socket and webGL based browser game to learn wheelchair movements with an app.

## Run instructions
1. Make sure you have node.js and bower installed on your computer.
2. Install the dependencies with:
<pre>
$ npm install
$ bower install
</pre>
3. When node.js is installed run with:
<pre>
$ node app.js
</pre>
The app will now run on port 8080, you can change port by adding arguments in the terminal:
<pre>
$ node app.js 1337
</pre>
The port will now be 1337.

## Structure
The communication is made with socket.io.

Whats being rendered on the server is determined by the html-file "server.html" located in "public/views". This is where we add the canvas for WebGL/three.js.

Put the js-files (for WebGL or three.js graphics) you create in "public/scripts" and reference them at the end of the body-tag in server.html

