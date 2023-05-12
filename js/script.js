$(document).ready(function () {

  // Global variable to store the JSON data
  let languageData = null;

  // Smooth scrolling for navigation links
  $('a.nav-link').on('click', function (event) {
    if (this.hash !== '') {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        window.location.hash = hash;
      });
    }
  });

  window.addEventListener('scroll', function () {
    var navBar = document.querySelector('nav');

    if (window.scrollY > 40) {
      navBar.classList.add('scrolled');
    } else {
      navBar.classList.remove('scrolled');
    }
  });

  // UpdateScrollPos

  // Event listener to scroll to top when the page is loaded
  window.onload = document.documentElement.scrollBy(0,1);

  // Back to top button
  var backToTopButton = $('#back-to-top');

  $(window).scroll(function () {
    if ($(window).scrollTop() > 200) {
      backToTopButton.addClass('active');
    } else {
      backToTopButton.removeClass('active');
    }
  });

  backToTopButton.click(function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
  });

  // Get language buttons
  const enBtn = document.getElementById('enBtn');
  const esBtn = document.getElementById('esBtn');
  const cnBtn = document.getElementById('cnBtn');

  // Language button event listeners
  enBtn.addEventListener('click', function (event) {
    event.preventDefault();
    setLanguage('en');
  });

  esBtn.addEventListener('click', function (event) {
    event.preventDefault();
    setLanguage('es');
  });

  cnBtn.addEventListener('click', function (event) {
    event.preventDefault();
    setLanguage('cn');
  });

  // Function to get the language preference from local storage
  function getLanguage() {
    if (localStorage.getItem('language') === null) {
      return 'es'; // default language
    }
    else return localStorage.getItem('language');
  }

  // Function to set the language
  function setLanguage(lang) {
    // Perform actions to change the content language
    // For example, you can update text content, replace images, etc.
    // Save the language preference in local storage
    localStorage.setItem('language', lang);

    // Fetch the JSON file based on the selected language
    fetch('./content.json')
      .then(response => response.json())
      .then(data => {
        languageData = data;

        // Retrieve the content based on the selected language
        const content = languageData[lang];

        //ABOUT SECTION
        const aboutSection = document.getElementById('about');
        const aboutTitle = aboutSection.querySelector('h2');
        const aboutContent = aboutSection.querySelector('p');

        //PRODUCTS
        const productsSection = document.getElementById('products');
        const productsTitle = productsSection.querySelector('h2');
        const productsContent = productsSection.querySelector('p');

        //EVENTS

        //STAFF

        //CONTACT

        //SET CONTENT FROM JSON OBJECT
        aboutTitle.textContent = content.about.title;
        aboutContent.innerHTML = content.about.content;

        productsTitle.textContent = content.products.title;
        productsContent.textContent = content.products.content;

        addReadMoreButton();

      })
      .catch(error => {
        console.error('Error loading content:', error);
      });
  }

  // When the document is ready, set the language to the stored preference
  $(document).ready(function () {
    var storedLanguage = getLanguage();
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  });

  // Function to add the "Read More" button
  function addReadMoreButton() {
    const lang = getLanguage();
    const content = languageData[lang];

    const aboutSection = document.getElementById('about');
    const aboutContent = aboutSection.querySelector('p');

    let readMoreContainer = aboutSection.querySelector('.read-more-container');
    let readMoreButton = aboutSection.querySelector('.read-more-container button');

    if (!readMoreContainer) {
      // Create the container element for the button
      readMoreContainer = document.createElement('div');
      readMoreContainer.classList.add('read-more-container');

      // Create the button element
      readMoreButton = document.createElement('button');
      readMoreButton.textContent = content.buttons.readMore;

      // Read more button functionality
      readMoreButton.addEventListener('click', function () {
        aboutContent.classList.toggle('expanded');
        if (aboutContent.classList.contains('expanded')) {
          readMoreButton.textContent = languageData[getLanguage()].buttons.readLess;;
        } else {
          readMoreButton.textContent = languageData[getLanguage()].buttons.readMore;
        }
      });

      // Append the button to the container
      readMoreContainer.appendChild(readMoreButton);

      // Append the container to the section
      aboutSection.appendChild(readMoreContainer);
    }
    console.log('Current selected language: ' + getLanguage());
    if (aboutContent.classList.contains('expanded')) {
      readMoreButton.textContent = languageData[getLanguage()].buttons.readLess;
    } else {
      readMoreButton.textContent = languageData[getLanguage()].buttons.readMore;
    }
  }

  // When the document is ready, set the language to the stored preference
  $(document).ready(function () {
    var storedLanguage = getLanguage();
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  });

});
