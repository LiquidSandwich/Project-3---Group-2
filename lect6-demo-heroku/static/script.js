window.onload = () => { // onload makes sure the content is loaded on page first
    document.getElementById('myCoolButton').addEventListener('click', () => {
        
        const userText = document.getElementById('name').value;// Grabs user input
        const url = '/search/' + userText; // This should remind you of APIs in Python!
        
        
        window.fetch(url).then(response => response.json()) // So should JSON conversion!
            .then(data => { // .then will only run the function *once* the data is fetched from the internet
                console.log(data); // See what this logs!
                
                // Creates new element to replace title html with
                // Learned how to replace html using 
                // https://www.geeksforgeeks.org/how-to-replace-the-entire-html-node-using-javascript/ 
                // and https://www.w3schools.com/js/js_htmldom_elements.asp
                const newTitle = document.createElement('h1');
                newTitle.textContent = "What's being reported about " + userText + "?"; 
                
                var currentTitle = document.getElementsByTagName("h1")
                console.log(currentTitle[0].innerHTML);
                document.body.innerHTML = document.body.innerHTML.replace(currentTitle[0].innerHTML, 
                newTitle.textContent);
                console.log(currentTitle[0].innerHTML);
                
                
                // Takes headlines and snippets and replaces the current html with the new html
                var i = 0;
                for (i=0; i<10; i++) {
                    const newHead = document.createElement('div');
                    newHead.textContent = data['headlines'][i]; // Sets the text of the element
                
                    const currentHead = document.getElementsByTagName("b")
                    document.body.innerHTML = document.body.innerHTML.replace(currentHead[i].innerHTML, 
                    newHead.textContent);
                    
                    const newSnip = document.createElement('div');
                    newSnip.textContent = data['snippets'][i]; // Sets the text of the element
            
                
                    const currentSnip = document.getElementsByClassName("snip");
                    document.body.innerHTML = document.body.innerHTML.replace(currentSnip[i].innerHTML, 
                    newSnip.textContent);
                }
             });
             
        // Everything you want to do when button is clicked below
        console.log('Button was clicked!'); // console.log is like printing in JS!
        
        alert("'" + userText + "'" + " was the text typed in!");
    });
};