// Menu data structure
var menuLinks = [
  { text: 'about', href: '/about' },
  {
    text: 'catalog', href: '#', subLinks: [
      { text: 'all', href: '/catalog/all' },
      { text: 'top selling', href: '/catalog/top' },
      { text: 'search', href: '/catalog/search' },
    ]
  },
  {
    text: 'orders', href: '#', subLinks: [
      { text: 'new', href: '/orders/new' },
      { text: 'pending', href: '/orders/pending' },
      { text: 'history', href: '/orders/history' },
    ]
  },
  {
    text: 'account', href: '#', subLinks: [
      { text: 'profile', href: '/account/profile' },
      { text: 'sign out', href: '/account/signout' },
    ]
  },
];


// Part 1: Getting Started
const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
mainEl.classList.add("flex-ctr");

// Part 2: Creating a Menu Bar
const topMenuEl = document.querySelector("#top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

// Part 3: Adding Menu Buttons
menuLinks.forEach((link) => {
  const newElement = document.createElement("a");
  newElement.setAttribute("href", link.href);
  newElement.textContent = link.text;
  topMenuEl.appendChild(newElement);
});

// =====  PART TWO  =====
// Part 3: Creating the Submenu

const subMenuEl = document.querySelector('#sub-menu');
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';

// Part 4: Adding Menu Interaction
const topMenuLinks = document.querySelectorAll('#top-menu a');
console.log(topMenuLinks);

topMenuLinks.forEach(link => {
  link.addEventListener('click', handleClick);
}
)

function handleClick(event) {
  event.preventDefault();
  if (event.target.tagName !== 'A') return;
  //console.log(event.target.textContent);

  // Part 5: Adding Submenu Interaction

  const clickedLink = event.target;

  // Check if the clicked link is already active -- when first clicked there is no active class
  if (clickedLink.classList.contains('active')) {
    // Remove the "active" class to deactivate the link
    clickedLink.classList.remove('active');
    // Hide the submenu by setting top to 0 --this hiddes the submenu when the link is clicked again
    subMenuEl.style.top = '0';
    return;
  }

  // Remove "active" class from all links to ensure only one is active at a time
  topMenuLinks.forEach(link => link.classList.remove('active'));

  // Add "active" class to the clicked link
  clickedLink.classList.add('active');


  // cashe the link object from menuLinks
  const linkObject = menuLinks.find(link => link.text === event.target.textContent);
  // show the subMenuEl if there are sublinks
  if (linkObject.subLinks) {
    subMenuEl.style.top = '100%';
    buildSubmenu(linkObject.subLinks);
  } else {
    subMenuEl.style.top = '0';
  }

  
}

// --- Building the submenu ---

function buildSubmenu(sublinks){
  subMenuEl.innerHTML = '';
  sublinks.forEach(link => {
    const newLink = document.createElement('a');
    newLink.setAttribute('href', link.href);
    newLink.textContent = link.text;
    subMenuEl.appendChild(newLink);
  })
}

// interactions with the submenu
subMenuEl.addEventListener('click', handleSubmenuClick); 

function handleSubmenuClick(event){
  event.preventDefault();
  if (event.target.tagName !== 'A') return;
  console.log(event.target.textContent);
  subMenuEl.style.top = '0';
  topMenuLinks.forEach(link => link.classList.remove('active'));

  if (event.target.textContent.toLowerCase() === 'about'){
    mainEl.querySelector('h1').textContent= 'About';
  }else {
    mainEl.querySelector('h1').textContent = event.target.textContent;
  }

}

