function initMap() {}

document.addEventListener("DOMContentLoaded", function () {
  const galleryAPI =
    "https://www.randyconnolly.com/funwebdev/3rd/api/art/galleries.php";

  const paintingsAPI =
    "https://www.randyconnolly.com/funwebdev/3rd/api/art/paintings.php?gallery=";
  
  
  const imagesAPI =
    `https://res.cloudinary.com/funwebdev/image/upload/w_150/art/paintings/square/`;

  const singleImageAPI = "https://res.cloudinary.com/funwebdev/image/upload/w_800/art/paintings/square/"
  const largeImageAPI = "https://res.cloudinary.com/funwebdev/image/upload/w_1100/art/paintings/square/"
  

  const container = document.querySelector(".container");
  const loader1 = document.querySelector(".loader1");
  const loader2 = document.querySelector(".loader2");
  const paintings = document.querySelector(".painting section");
  const map = document.querySelector(".map section");
  const list = document.querySelector(".list");
  const info = document.querySelector(".info");
  const mapBox = document.querySelector(".map");
  const paintingBox = document.querySelector(".painting");
  const detail = document.querySelector(".detail");
  loader2.style.display = "none";
  container.style.display = "none";
  paintings.style.display = "none";
  map.style.display = "none";

  loadData();

  let galleryData = {};
  async function loadData() {
    await fetch(galleryAPI)
      .then((response) => response.json())
      .then((data) => {
        loader1.style.display = "none";
        container.style.display = "grid";
        galleryData = data.sort((a, b) =>
          a.GalleryName > b.GalleryName
            ? 1
            : b.GalleryName > a.GalleryName
            ? -1
            : 0
        );

        document.querySelector("#icon").addEventListener("click", () => {
          const h2 = document.querySelector(".list h2");
          h2.classList.toggle("hidden");
          const galleryList = document.querySelector("#list");
          galleryList.classList.toggle("hidden");
          container.classList.toggle("hiddenContainer");
        });
        populateList();
        populateInfo();
      });
  }

  function singleImageView() {
    document.querySelectorAll(".paintingTitle").forEach((title) => {
      title.addEventListener("click", () => {
        list.classList.toggle("singleView");
        info.classList.toggle("singleView");
        mapBox.classList.toggle("singleView");
        paintingBox.classList.toggle("singleView");
        detail.style.display = "grid";

        const detailImg = document.querySelector(".detail img")
        const single = document.querySelector("#single")
        for (image of imageData ) {
          if (image.Title == title.innerHTML) {
            detailImg.setAttribute("src", singleImageAPI+image.ImageFileName);
            single.setAttribute("src", largeImageAPI+image.ImageFileName);
            const h1 = document.querySelector(".detail h1")
            h1.innerHTML = ""
            h1.appendChild(document.createTextNode(image.Title));
            const h3 = document.querySelector(".detail h3")
            h3.innerHTML = ""
            h3.appendChild(document.createTextNode(`${image.LastName} ${image.FirstName}`))
            const year = document.querySelector("#singleYear")
            year.innerHTML = ""
            year.appendChild(document.createTextNode(image.YearOfWork))
            const medium = document.querySelector("#singleMedium")
            medium.innerHTML = ""
            medium.appendChild(document.createTextNode(image.Medium))
            const width = document.querySelector("#singleWidth")
            width.innerHTML = ""
            width.appendChild(document.createTextNode(image.Width))
            const height = document.querySelector("#singleHeight")
            height.innerHTML = ""
            height.appendChild(document.createTextNode(image.Height))
            const copyright = document.querySelector("#singleCopyright")
            copyright.innerHTML = ""
            copyright.appendChild(document.createTextNode(image.CopyrightText))
            const name = document.querySelector("#singleName")
            name.innerHTML = ""
            name.appendChild(document.createTextNode(image.GalleryName))
            const city = document.querySelector("#singleCity")
            city.innerHTML = ""
            city.appendChild(document.createTextNode(image.GalleryCity))
            const link = document.querySelector("#singleLink")
            link.innerHTML = ""
            link.appendChild(document.createTextNode(image.MuseumLink))
            const description = document.querySelector("#singleDescription")
            description.innerHTML = ""
            description.appendChild(document.createTextNode(image.Description))
            const colors = document.querySelector("#color");
            colors.innerHTML =""
            for (color of image.JsonAnnotations.dominantColors) {
              const span = document.createElement("span");
              span.style.backgroundColor = color.web
              span.setAttribute("title", `Name:${color.name} Hex:${color.web}`);
              
              
              colors.appendChild(span)
            }


          }
        }
      });
    });

    const large = document.querySelector("#single")
    document.querySelector(".detail img").addEventListener("click", () => {
      
      large.style.visibility = "visible"
    })

    document.querySelector("#single").addEventListener("click", () => {
      large.style.visibility = "hidden"
    })
    document.querySelector("button").onclick = function() {
      list.classList.toggle("singleView");
      info.classList.toggle("singleView");
      mapBox.classList.toggle("singleView");
      paintingBox.classList.toggle("singleView");
      detail.style.display = "none";
    };
  }

  

  function populateList() {
    const list = document.querySelector("#list");
    for (gallery of galleryData) {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(gallery.GalleryName));
      list.appendChild(li);
    }
  }

  function populateInfo() {
    const name = document.querySelector("#galleryName");
    const native = document.querySelector("#galleryNative");
    const city = document.querySelector("#galleryCity");
    const address = document.querySelector("#galleryAddress");
    const country = document.querySelector("#galleryCountry");
    const home = document.querySelector("#galleryHome");

    document.querySelectorAll("#list li").forEach((listItem) => {
      listItem.addEventListener("click", () => {
        for (gallery of galleryData) {
          if (gallery.GalleryName == listItem.innerHTML) {
            name.innerHTML = "";
            native.innerHTML = "";
            city.innerHTML = "";
            address.innerHTML = "";
            country.innerHTML = "";
            home.innerHTML = "";
            name.appendChild(document.createTextNode(listItem.innerHTML));
            native.appendChild(
              document.createTextNode(gallery.GalleryNativeName)
            );
            city.appendChild(document.createTextNode(gallery.GalleryCity));
            address.appendChild(
              document.createTextNode(gallery.GalleryAddress)
            );
            country.appendChild(
              document.createTextNode(gallery.GalleryCountry)
            );
            home.setAttribute("href", gallery.GalleryWebSite);
            home.appendChild(document.createTextNode(gallery.GalleryWebSite));
            document.querySelector(".info section").style.display = "grid";
            loader2.style.display = "block";
            paintings.style.display = "none";

            const map = new google.maps.Map(document.querySelector(".map"), {
              center: {
                lat: gallery.Latitude,
                lng: gallery.Longitude,
              },
              mapTypeId: "satellite",
              zoom: 18,
            });
            map.setTilt(45);

            getImages(gallery.GalleryID);
          }
        }
      });
    });
  }

  let imageData = {};

  async function getImages(id) {
    await fetch(paintingsAPI + id)
      .then((response) => response.json())
      .then((data) => {
        imageData = data.sort((a, b) =>
          a.LastName > b.LastName ? 1 : b.LastName > a.LastName ? -1 : 0
        );
        populatePaintings();
        loader2.style.display = "none";
        paintings.style.display = "block";
      });
  }

  function populatePaintings() {
    const table = document.querySelector("table");
    table.innerHTML = "";
    const tr = document.createElement("tr");
    tr.appendChild(document.createElement("th"));
    let text = document.createTextNode("Artist");
    let th = document.createElement("th");
    th.setAttribute("class", "artist");
    th.appendChild(text);
    tr.appendChild(th);
    text = document.createTextNode("Title");
    th = document.createElement("th");
    th.setAttribute("class", "title");
    th.appendChild(text);
    tr.appendChild(th);
    text = document.createTextNode("Year");
    th = document.createElement("th");
    th.setAttribute("class", "year");
    th.appendChild(text);
    tr.appendChild(th);
    table.appendChild(tr);
    for (painting of imageData) {
      const tr = document.createElement("tr");
      const img = document.createElement("img");
      img.setAttribute("src", imagesAPI + painting.ImageFileName);
      tr.appendChild(img);
      let td = document.createElement("td");
      let text = document.createTextNode(painting.LastName);
      td.appendChild(text);
      tr.appendChild(td);
      td = document.createElement("td");
      text = document.createTextNode(painting.Title);
      td.setAttribute("class", "paintingTitle");
      td.appendChild(text);
      tr.appendChild(td);
      td = document.createElement("td");
      text = document.createTextNode(painting.YearOfWork);
      td.appendChild(text);
      tr.appendChild(td);
      table.appendChild(tr);
    }
    sortPaintings();
    singleImageView();
  }

  function sortPaintings() {
    document.querySelector(".artist").addEventListener("click", () => {
      imageData = imageData.sort((a, b) =>
        a.LastName > b.LastName ? 1 : b.LastName > a.LastName ? -1 : 0
      );
      populatePaintings();
    });
    document.querySelector(".title").addEventListener("click", () => {
      imageData = imageData.sort((a, b) =>
        a.Title > b.title ? 1 : b.Title > a.Title ? -1 : 0
      );
      populatePaintings();
    });
    document.querySelector(".year").addEventListener("click", () => {
      imageData = imageData.sort((a, b) =>
        a.YearOfWork > b.YearOfWork ? 1 : b.YearOfWork > a.YearOfWork ? -1 : 0
      );
      populatePaintings();
    });
  }
});
