const weatherAPIKey = "0f50f680bd009646ab1d8e44f51a5be0";
const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

const gallery = [
    {
        src : "./assets/gallery/image1.jpg",
        alt : "Thumbnail Image 1"
    },
    {
        src : "./assets/gallery/image2.jpg", 
        alt : "Thumbnail Image 2"
    },
    {
        src : "./assets/gallery/image3.jpg",
        alt : "Thumbnail Image 3"
    }
];

const products = [
    
    {
        title: "AstroFiction",
        author: "John Doe",
        price: 49.9,
        image: "./assets/products/img6.png"
    },
    {
        title: "Space Odissey",
        author: "Marie Anne",
        price: 35,
        image: "./assets/products/img1.png"
    },
    {
        title: "Doomed City",
        author: "Jason Cobert",
        price: 0,
        image: "./assets/products/img2.png"
    },
    {
        title: "Black Dog",
        author: "John Doe",
        price: 85.35,
        image: "./assets/products/img3.png"
    },
    {
        title: "My Little Robot",
        author: "Pedro Paulo",
        price: 0,
        image: "./assets/products/img5.png"
    },
    {
        title: "Garden Girl",
        author: "Ankit Patel",
        price: 45,
        image: "./assets/products/img4.png"
    }
] 

// Menu Section
function menuHandler()
{
    document.querySelector("#open-nav-menu").addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });
    document.querySelector("#close-nav-menu").addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
    
}

function celciusTofahr(temp)
{
    let farheniteTemperature = (temp * 9/5) + 32;
    return farheniteTemperature;
}

function celciusToKelvin(temp)
{
    let kelvinTemperature = (temp + 273.15);
    return kelvinTemperature;
}

// Greeting Section
function greetingHandler()
{
    const greetingText = "Good Morning!";
}

function weatherHandler()
{
    navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let url = weatherAPIUrl
            .replace("{lat}", latitude)
            .replace("{lon}", longitude)
            .replace("{API key}", weatherAPIKey);
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const Condition = data.weather[0].description;
                const Location = data.name;
                const temperature = undefined;
                // const temperature = data.main.temp;
    
                let weatherTextcelcius = `The weather is ${Condition} in ${Location} and it's ${temperature.toFixed(1)}°C outside.`;
                document.querySelector("#weather").innerHTML = weatherTextcelcius;
                // let weatherTextcelcius = `The weather is ${Condition} in ${Location} and it's ${temp.toFixed(1)}°C outside.`;
                let weatherTextFahr = `The weather is ${Condition} in ${Location} and it's ${celciusTofahr(temperature).toFixed(1)}F outside.`;
                let weatherTextKelvin = `The weather is ${Condition} in ${Location} and it's ${celciusToKelvin(temperature).toFixed(1)}K outside.`;
                document.querySelector(".weather-group").addEventListener("click", function(e){
                    if(e.target.id == "fahr")
                    {
                        document.querySelector("p#weather").innerHTML = weatherTextFahr;
                    }
                    else if(e.target.id == "kel")
                    {
                        document.querySelector("p#weather").innerHTML = weatherTextKelvin;
                    }
                    else
                    {
                        document.querySelector("p#weather").innerHTML = weatherTextcelcius;
                    }
                });
            }).catch(err => {
                document.querySelector("p#weather").innerHTML = "Unable to get the weather info";
            });
    });
    
}

function clockHandler()
{
    setInterval(function updatingTime()
    {
        let localTime = new Date();
        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2,"0");
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2,"0");
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2,"0");
    }, 1000); // to repeat something automatically , 1000 == 1 second (1000milliseconds)

    let localHours = new Date().getHours();
    // let localHours = 19;

    setTimeout(function(){
        if(localHours < 12) {
            // console.log("Morning");
            document.querySelector("h1#greeting").innerHTML = "Good Morning!";
        }
        else if(localHours < 19) {
            document.querySelector("h1#greeting").innerHTML = "Good Afternoon!";
            // console.log("AfterNoon");
        }     
        else if(localHours >= 19) {
            document.querySelector("h1#greeting").innerHTML = "Good Night!";
            // console.log("Night");
        }     
        else{
            document.querySelector("h1#greeting").innerHTML = "Welcome!";
        }
    }, 0o0)
    
}

// Gallery Section
function galleryHandler()
{
    let mainImage = document.querySelector("#gallery > img");
    mainImage.src = gallery[0].src;
    mainImage.alt = gallery[0].alt;
    let thumbnail = document.querySelector("#gallery .thumbnails")
    
    gallery.forEach(function(image, index){
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex =  index;
        thumb.dataset.selected = index === 0 ? true : false;
    
        thumb.addEventListener("click", function(e){
            console.log(e.target.dataset.arrayIndex);
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImage = gallery[selectedIndex];
            mainImage.src = selectedImage.src;
            mainImage.alt = selectedImage.alt;
            
            // thumb.dataset.selected = true;
            thumbnail.querySelectorAll("img").forEach(function(img){
                img.dataset.selected = false;
            });
            this.dataset.selected = true;
            // e.target.dataset.selected = true;
    
        });
        thumbnail.appendChild(thumb);
    });
    
}

//Product-handler
function populateProducts(productList)
{
        let productsSection = document.querySelector(".products-area");
        productsSection.textContent = "";

        productList.forEach(function(product, index){
        let productElm = document.createElement("div")
        productElm.classList.add("product-item");
    
        let productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = "Image of" + product.title;
    
         // Creating the product detail section
        let productDetails = document.createElement("div");
        productDetails.classList.add("product-details");    
        
        // Creating childs of product-details like Author Name etc
        let productTitle = document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.textContent = product.title;
        productDetails.append(productTitle);
        
        let productAuthor = document.createElement("p");
        productAuthor.classList.add("product-author");
        productAuthor.textContent = product.author;
        productDetails.append(productAuthor);
    
        let priceTitle = document.createElement("p");
        priceTitle.classList.add("price-title");
        priceTitle.textContent = "Price";
        productDetails.append(priceTitle);
    
    
        let productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "Free";
    
        productDetails.append(productPrice);
    
        productElm.append(productImage);
        productElm.append(productDetails);
        // productElm.append(productTitle);
        productsSection.append(productElm);
    
        });
}

function producthandler()
{
    // let productsSection = document.querySelector(".products-area");
    

    let totalProducts = products.length;
    
    let freeProducts = products.filter(item => item.price <= 0 || !item.price);
    
    let paidProducts = products.filter(item => item.price > 0);
    
    populateProducts(products);
    // populateProducts(paidProducts);
    // populateProducts(freeProducts);
    
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = totalProducts;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;
    
    let productsFilter = document.querySelector(".products-filter");
    productsFilter.addEventListener("click", function(e){
        console.log(e.target.id);
        if(e.target.id === "all")
        {
            populateProducts(products);
            // console.log("I am free");
        }
        else if(e.target.id === "paid")
        {
            populateProducts(paidProducts);
            // console.log("I am paid");
        }
        else if(e.target.id === "free")
        {
            populateProducts(freeProducts);
            // console.log("all products");
        }
    });
}

function footerHandler()
{
    let year = new Date().getFullYear();
    document.querySelector("footer").innerHTML = `&copy; ${year} - All rights reserved`;
    // document.querySelector("footer").style.fontSize = "15px";
}





// Page Load
menuHandler();
greetingHandler();
weatherHandler();
clockHandler();
galleryHandler();
producthandler();
footerHandler();