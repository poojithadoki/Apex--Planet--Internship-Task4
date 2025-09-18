 function scrollToSection(id) {
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    }

    let todos=[];
    window.onload=function (){
        let stored=localStorage.getItem("todos");
        if(stored){
            todos=JSON.parse(stored);
            renderTodos();
        }
    }
    function addItem(){
        let input=document.getElementById("item");
        let task=input.value.trim();
        if(task==="") return;
        todos.push(task);
        input.value="";
        renderTodos();
    }
    function saveTodos(){
        localStorage.setItem("todos",JSON.stringify(todos));
    }
    function renderTodos(){
        let list=document.getElementById("todoList");
        list.innerHTML="";
        todos.forEach((task,index)=>{
            let li=document.createElement("li");
            li.textContent=task;

            let button=document.createElement("button");
            button.innerText="Remove";
            button.addEventListener("click",function(){
                todos.splice(index,1);
                renderTodos();
            });
            li.appendChild(button);
            list.appendChild(li);
        });
        saveTodos();
    }

    
    const products = [
      { id: 1, name: "Smartphone", category: "electronics", price: 20000, rating: 4.5 },
      { id: 2, name: "Laptop", category: "electronics", price: 55000, rating: 4.7 },
      { id: 3, name: "T-shirt", category: "clothing", price: 500, rating: 4.0 },
      { id: 4, name: "Jeans", category: "clothing", price: 1200, rating: 3.8 },
      { id: 5, name: "Novel", category: "books", price: 300, rating: 4.6 },
      { id: 6, name: "Textbook", category: "books", price: 800, rating: 4.2 },
      { id: 7, name:"Earpods", category:"electronics", price:1500, rating:4.7 }
    ];

    const productList = document.getElementById("productList");
    const categoryFilter = document.getElementById("categoryFilter");
    const priceFilter = document.getElementById("priceFilter");
    const sortOption = document.getElementById("sortOption");

    function renderProducts(items) {
      productList.innerHTML = "";
      if (items.length === 0) {
        productList.innerHTML = "<p>No products found</p>";
        return;
      }
      items.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
          <h3>${p.name}</h3>
          <p class="price">₹${p.price}</p>
          <p>Category: ${p.category}</p>
          <p>Rating:  ${p.rating}</p>
        `;
        productList.appendChild(div);
      });
    }

    function applyFiltersAndSort() {
      let filtered = [...products];
      const category = categoryFilter.value;
      if (category !== "all") filtered = filtered.filter(p => p.category === category);

      const maxPrice = parseFloat(priceFilter.value);
      if (!isNaN(maxPrice)) filtered = filtered.filter(p => p.price <= maxPrice);

      const sortVal = sortOption.value;
      if (sortVal === "priceLowHigh") filtered.sort((a, b) => a.price - b.price);
      else if (sortVal === "priceHighLow") filtered.sort((a, b) => b.price - a.price);
      else if (sortVal === "ratingHighLow") filtered.sort((a, b) => b.rating - a.rating);

      renderProducts(filtered);
    }

    categoryFilter.addEventListener("change", applyFiltersAndSort);
    priceFilter.addEventListener("input", applyFiltersAndSort);
    sortOption.addEventListener("change", applyFiltersAndSort);

    renderProducts(products);