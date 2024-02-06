# Project Donkey Audit

A personal project to practice the handling of APIs. Use the publically available UK parliament API to return data regarding specific MPs through a static web page.

<hr>

# Inspiration

- [Led by Donkeys](https://www.youtube.com/c/LedByDonkeys) are a fantastic organisation that deserve far more attention and influence than they receive. I passionately believe in greater transparency and accountability for elected officals and Governments. I feel that the imagined product would not be out of place as part of a similar instituition's website.
- Similar sites/services exist, such as [TheyWorkForYou](https://www.theyworkforyou.com/) and the [UK Parliament site "Find Your MP" service](https://members.parliament.uk/FindYourMP), but are they difficult to use, could present the data more clearly (in my opinion) and are not well known.
- I would like to produce a very simple website which displays multiple items from the [UK Parliament Member API](https://members-api.parliament.uk/index.html) for a specified MP.
- This information would be presented clearly with a short section on how to critically appraise the information.

#
# Outline

- Return information on MPs based on a search.

- Present the returned information clearly, with an about page that will assist the user with how to interpret the information and clearly state the owner/developer of this site along with their intention.

- Simple Aesthetic = Newspaper.

#

/*Placeholder - site displayed on multiple devices*/
<p align="center">
<img src="assets\images\livery-large.PNG" width="600" height="100%">
</p>

You can view the deployed website [here](https://github.com/ProfYaffle88/donkey-audit).

<hr>
#
# UX

Newspaper



## Users Stories 

- As a new user of this website, I want to be able to quickly and simply access an MPs most relevant records.
- As a new user of this website, I want data to presented in a clear, unbiased and digestible fashion.
- As a new user of this website, I want it to be clear who made this, and why they made it.


#
# Scope 

## Features

- Search parliament records by MP name (this can be handled with the API search query parameter to return an id for a specific MP) 


### Future Features

- Postcode search returning MP for that postcode (this may require several additional steps to convert postcode to constituencyId, constituencyId to mpId)
- ONS data for constituency postcodes is available as a .csv file from the ONS website.

#
# Structure (TBC)

- **Header**  
    - Newspaper livery positioned left, About-page link on the right
    - Appears on every page

- **Home Page**
    - Search form with submit button
    - Updates page to display retrieved interesting MP data
    - 'Search Again' button to reset page to initial state.

- **About** 
    - Explains displayed data and how to interpret it
    - Call to action to participate in government by writing to your MP/Voting
    - Clear statement of transparency on my behalf

- **Footer**
    - Appears on every page with required attributions and any/all social media links 

<hr>

# Wireframes

### _Mobile View - Home Page_

### _Home Page_ 

<p align="center">
<img src="assets\images\wireframes\desktop-search.png" width="1000px" height="528px">
</p>

### _Results_

<p align="center">
<img src="assets\images\wireframes\desktop-results.png" width="1000px" height="528px">
</p>

### _About_

<p align="center">
<img src="assets\images\wireframes\desktop-about.png" width="1000px" height="528px">
</p>

<p align="center">
<img src="assets\images\wireframes\mobile-search.png" width="500px" height="994px">
</p>

### _Mobile View - Results_

<p align="center">
<img src="assets\images\wireframes\mobile-results.png" width="500px" height="994px">
</p>

### _Mobile View - About_

<p align="center">
<img src="assets\images\wireframes\mobile-about.png" width="500px" height="994px">
</p>

<hr>

# Surface

## Design
- Newspaper Aesthetic
- - Simple greyscale/black and white/off-white colour palette

## Chosen Colour Palette 
- Used #FFF and #000 for black and white

## Fonts 
- Imported Fraunces font (Google Fonts)


## Media
- Used a paper-effect background image

**Newspaper Livery** 
- A parody Newspaper livery was created by me using [Canva.com](www.canva.com)

<hr>

# Technologies Used

## Languages 

- [HTML5](https://en.wikipedia.org/wiki/HTML5)
- [CSS3](https://en.wikipedia.org/wiki/CSS)

## Frameworks, Libraries & Programs Used

- [Google Fonts](https://fonts.google.com/https://fonts.google.com/) - provided the Fraunces font for the site.

- [Font Awesome](https://fontawesome.com/) - was used for the site icons.

- [Boostrap](https://getbootstrap.com/) - was used to assist styling.

- [Github](https://github.com/ProfYaffle88) - was used to store the project code.

- [Balsamiq](https://balsamiq.com/) - was used to create site wireframes.

- [UK Parliament member API](https://members-api.parliament.uk/index.html) - provided all information licensed under the Open Parliament Licence v3.0. 

<!-- - [Am I Responsive](http://ami.responsivedesign.is/) - to check if the site is responsive on different screen sizes.

- [Free Online HTML Formatter](https://www.freeformatter.com/html-formatter.html) - was used to correct indentation issues and get rid of too much whitespace

# Testing
- Tested on . . . version browsers
- Chrome Developer Tools are used to test the responsiveness on: Desktop, Laptop, Moto G4, Galaxy S5, iPhone 5/SE, iPhone 6,7,8, iPhone 6,7,8 Plus, iPad, iPad Pro, Galaxy Fold

# Validating 
The W3C Markup Validator and W3C CSS Validator Services were used to check my code for syntax errors in this project.

- [HTML](https://validator.w3.org/#validate_by_input)- I checked each page by direct input method on HTML validator site

<p align="center">
<img src="#" width="400" height="100%">
</p>

- [CSS](https://jigsaw.w3.org/css-validator/)

<p align="center">
<img src="#" width="400" height="100%">
</p>

- I used Lighthouse tools to test my website
<p align="center">
<img src="#" width="400" height="100%">
</p>

## User Story Testing

### **Testing Users Stories form (UX) Section**

1.  As a new user of this website, 

 *Desktop,Laptop View*

<p align="center">
<img src="#" width="700" height="100%">
</p>
        

 *Tablet View* 

<p align="center">
<img src="#" width="500" height="100%">
</p>

 *Phone View*

<p align="center">
<img src="#" width="300" height="100%">
</p>


2. As a new user of this website, 

<p align="center">
<img src="#" width="600" height="100%">
</p>

3. As a new user of this website, 

<p align="center">
<img src="#" width="600" height="100%">
</p>

## Bugs and Issues

- TBC

<p align="center">
<img src="#" width="300" height="100%">
</p>

- Design improvment- 

- For the Gallery Lighthouse report-

### **HTML Validator** 

- *Warning* : 

- *Warning* : 



### **CSS Validator** 

- *Value Error* : 

- *Warning* :  

- *Warning* : 

- *Warning* : 

- *Warning* 


# Final Product 

## Desktop View 
 
### _Home Page_

<p align="center">
<img src="#" width="600" height="100%">
</p>

<p align="center">
<img src="#" width="600" height="100%">
</p>

### _About_

<p align="center">
<img src="#" width="600" height="100%">
</p>

### _Contact_

<p align="center">
<img src="#" width="600" height="100%">
</p>

## Mobile View 
 
### _Home Page_

<p align="center">
<img src="#" width="600" height="100%">
</p>

<p align="center">
<img src="#" width="600" height="100%">
</p>

### _About_

<p align="center">
<img src="#" width="600" height="100%">
</p>

### _Contact_

<p align="center">
<img src="#" width="600" height="100%">
</p>


# Deployment

## GitHub Pages
1. GitHub Pages was used to deploy the site.
2. The site was deployed early for the purposes of testing.
3. The latest deployed version can be seen [here](https://profyaffle88.github.io/donkey-audit/)


# Credits

## Content

- Contains Parliamentary information licensed under the Open Parliament Licence v3.0. Provided through the [UK Parliament Members API](https://members-api.parliament.uk/index.html)
- The paper-texture background image is by [bedneyimages on Freepik](https://www.freepik.com/free-photo/white-texture_946233.htm#query=paper%20background&position=0&from_view=search&track=ais&uuid=e0d76099-8e15-4dfe-8c4e-20760eaf5938)
- All code was written by [ProfYaffle88](https://github.com/users/ProfYaffle88)
- The format of this ReadMe.md was adapted from a docoument by [Iris Smok](https://github.com/Iris-Smok)
- The header, footer and navbar were adapted from 
- Stack Overflow provided several solutions to multiple issues including alignment, positioning, and responsiveness. [Stack Overflow](https://stackoverflow.com/questions)

## Media

- Newspaper livery element was created using [Canva](https://www.canva.com/)
- MP portraits are provided through the UK Parliament Member API.

## Acknowledgements

- Thanks to w3 Schools, Stack Overflow, Code Institute and above all the holy trinity of instructors; Iris, Martin and Kevin. -->
