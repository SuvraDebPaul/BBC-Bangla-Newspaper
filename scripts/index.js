// GLobal Constants
const navContainer = document.getElementById("categoryContainer");
const newsContainer = document.getElementById("newsContainer");

// Loading Catagories for Menu
const loadCatagories = () => {
  const catagoryUrl = `https://news-api-fs.vercel.app/api/categories`;
  fetch(catagoryUrl)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => {
      console.log(err);
    });
};

loadCatagories();

// Displaying The Categories in The nav bar
const displayCategories = (categories) => {
  categories.forEach((category) => {
    navContainer.innerHTML += `
        <li id="${category.id}"
            class="border-b-4 border-b-transparent hover:border-b-4 hover:border-red-600 cursor-pointer transition-all"
          >
            ${category.title}
          </li>
    `;
  });
  // Event Listener For Adding and Removing Border Bottom Hover Effect
  navContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("border-red-600");
      li.classList.add("border-b-transparent");
    });
    if (e.target.localName === "li") {
      e.target.classList.remove("border-b-transparent");
      e.target.classList.add("border-red-600");
      loadNewsByCategory(e.target.id);
    }
  });
};

const loadNewsByCategory = (categoryId) => {
  const newsByCatUrl = `https://news-api-fs.vercel.app/api/categories/${categoryId}`;
  fetch(newsByCatUrl)
    .then((res) => res.json())
    .then((data) => showNewsByCategory(data.articles))
    .catch((err) => {
      console.log(err);
    });
};

const showNewsByCategory = (articles) => {
  //console.log(articles);
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    newsContainer.innerHTML += `
        <div class="news">
          <img
            src="${article.image.srcset[5].url}"
            alt="${article.image.alt}"
          />
          <h2 class="text-2xl font-bold my-5">
            <a href="${article.id}"
              >${article.title}</a
            >
          </h2>
          <p class="text-gray-600">
            ${article.description ? article.description : ""}
          </p>
          <p class="my-5 px-5 py-2 bg-gray-200 inline-block rounded-xl">
           ${article.time}
          </p>
        </div>
    `;
  });
};
loadNewsByCategory("main");
