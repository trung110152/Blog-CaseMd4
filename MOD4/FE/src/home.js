showNav();
function showList() {
    let token = localStorage.getItem('token')
    if(token){
        token = JSON.parse(token)
        // console.log(token.role)
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/blogs',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            success: (blogs) => {
                console.log(blogs);
                let html = '';
                if(token.role === 'admin'){
                    blogs.map(item => {
                        html += `<tr>
             <td>${item.id}</td>
            <td>${item.content}</td>
            <td>${item.status}</td>
            <td><img style="height: 200px;width: 200px" src="${item.image}" alt=""></td>
            <td>${item.date}</td>
            <td>${item.username}</td>
            <td>${item.nameCategory}</td>
            <td><button onclick="remove(${item.id})">Delete</button></td>
           
        </tr>`
                    })
                    $('#tbody').html(html)
                }
                else {
                    blogs.map(item => {
                        html += `<tr>
            <td>${item.id}</td>
            <td>${item.content}</td>
            <td>${item.status}</td>
            <td><img style="height: 200px;width: 200px" src="${item.image}" alt=""></td>
            <td>${item.date}</td>
            <td>${item.username}</td>
            <td>${item.nameCategory}</td>
            
 
          
        </tr>`
                    })
                    $('#tbody').html(html)
                }

            }
        })
    }


}


function getCategoriesCreate() {
    let token = localStorage.getItem('token')
    if (token) {
        token = JSON.parse(token)
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/blogs/getCategories',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            success: (categories) => {
                // console.log(categories)
                let Categories = ``;
                for (const category of categories) {
                    Categories += `
                    <option value=${category.id}>${category.name}</option>
                `
                }
                $('#categoryAdd').html(Categories);
            }
        })
    }
}

function showFormAdd() {
    let token = localStorage.getItem('token')
    token = JSON.parse(token)
    // console.log(token)
    $('#body').html(` 
             <input type="text" id = "content" placeholder="content"> 
             <input type="text" id = "status" placeholder="status"> 
             <input type="file" id="fileButton" onchange="uploadImage(event)">
             <div id="imgDiv"></div>
             <input type="text" id = "date" placeholder="date"> 
             <p>${token.username}</p>
             <select id="categoryAdd">
<!--             <option selected>Category</option>-->
             </select>
    <button onclick="add()">Add</button>`)
    getCategoriesCreate();
}

function showHome() {
    $('#body').html(`

    <table border="1">
        <thead>
        <tr>
            <td>ID</td>
            <td>Content</td>
            <td>Status</td>
            <td>Image</td>
            <td>Date</td>
            <td>Username</td>
            <td>Category</td>
            <td colspan="2">Action</td>
        </tr>
        </thead>
        <tbody id="tbody">

        </tbody>
    </table>`)
    showList();
}

function showNav() {
    let token = localStorage.getItem('token');
    token = JSON.parse(token)
    // console.log(token.role)
    if(token){
        if(token.role === 'member'){
            $('#nav').html(`
    <button onclick="showFormAdd()">Add</button>
    <button onclick="showHome()">Home</button>
    <button onclick="logout()">logout</button>
   
    <input type="search" id="search" placeholder="Enter name" onkeyup="searchProduct(this.value)">
    `)} else {
            $('#nav').html(`
    <button onclick="showHome()">Home</button>
    <button onclick="logout()">logout</button>
    <input type="search" id="search" placeholder="Enter name" onkeyup="searchProduct(this.value)">
    `)
        }

    } else {
        $('#nav').html(`
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
\t width="800px" height="600px" viewBox="0 0 800 600" enable-background="new 0 0 800 600" xml:space="preserve">
<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="174.7899" y1="186.34" x2="330.1259" y2="186.34" gradientTransform="matrix(0.8538 0.5206 -0.5206 0.8538 147.9521 -79.1468)">
\t<stop  offset="0" style="stop-color:#FFC035"/>
\t<stop  offset="0.221" style="stop-color:#F9A639"/>
\t<stop  offset="1" style="stop-color:#E64F48"/>
</linearGradient>
<circle fill="url(#SVGID_1_)" cx="266.498" cy="211.378" r="77.668"/>
<linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="290.551" y1="282.9592" x2="485.449" y2="282.9592">
\t<stop  offset="0" style="stop-color:#FFA33A"/>
\t<stop  offset="0.0992" style="stop-color:#E4A544"/>
\t<stop  offset="0.9624" style="stop-color:#00B59C"/>
</linearGradient>
<circle fill="url(#SVGID_2_)" cx="388" cy="282.959" r="97.449"/>
<linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="180.3469" y1="362.2723" x2="249.7487" y2="362.2723">
\t<stop  offset="0" style="stop-color:#12B3D6"/>
\t<stop  offset="1" style="stop-color:#7853A8"/>
</linearGradient>
<circle fill="url(#SVGID_3_)" cx="215.048" cy="362.272" r="34.701"/>
<linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="367.3469" y1="375.3673" x2="596.9388" y2="375.3673">
\t<stop  offset="0" style="stop-color:#12B3D6"/>
\t<stop  offset="1" style="stop-color:#7853A8"/>
</linearGradient>
<circle fill="url(#SVGID_4_)" cx="482.143" cy="375.367" r="114.796"/>
<linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="365.4405" y1="172.8044" x2="492.4478" y2="172.8044" gradientTransform="matrix(0.8954 0.4453 -0.4453 0.8954 127.9825 -160.7537)">
\t<stop  offset="0" style="stop-color:#FFA33A"/>
\t<stop  offset="1" style="stop-color:#DF3D8E"/>
</linearGradient>
<circle fill="url(#SVGID_5_)" cx="435.095" cy="184.986" r="63.504"/>
</svg>


<div class="container">
  <h2>login</h2>
  <form>
    <input type="text" class="email" placeholder="email">
    <br/>
    <input type="text" class="pwd" placeholder="password">
  </form>
  <a href="#" class="link">
    forgot your password ?
  </a>
  <br/>
  <button class="register" onclick="showFormRegister()">
    <span>register</span>
  </button>
  <button class="signin" onclick="showFormLogin()">
    <span>sign in</span>
  </button>
  <h3>your registration is complete !    </h3>
  <h3>your sign in is complete !</h3>
  <div class="reg"></div>
  <div class="sig"></div>

 
 
</div>
    `)
    }
}

function add() {
    let token = localStorage.getItem('token')
    // console.log(token)
    if(token){
        token = JSON.parse(token)
        let content = $('#content').val();
        let status = $('#status').val();
        let image = localStorage.getItem('image')
        let date = $('#date').val();
        let user = token.idUser;
        let category = $('#categoryAdd').val();
        let blog = {
            content: content,
            status: status,
            image: image,
            date: date,
            user: user
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/blogs',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            data: JSON.stringify(blog),

            success: (newBlog) => {
                let idBlog = newBlog.id;
                let blogCategory = {
                    idBlog : idBlog,
                    idCategory : category
                }
                // console.log(blogCategory,11111)

                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3000/blogs/blogCategory',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token.token
                    },
                    data: JSON.stringify(blogCategory),

                    success: () => {
                        // console.log(blogCategory,222222)
                        showHome()
                    }
                })

            }
        })
    }
}

function remove(id) {
    if(confirm('You are sure?')){
        let token = localStorage.getItem('token')
        if (token) {
            token = JSON.parse(token)
            $.ajax({
                type: 'DELETE',
                url: `http://localhost:3000/blogs/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token.token
                },
                success: () => {
                    showHome();
                }
            })
        }
    }
}

function showFormEdit(id) {
    let token = localStorage.getItem('token')
    if (token) {
        token = JSON.parse(token)
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/blogs/findById/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            success: (product) => {
                $('#body').html(`
<input type="text" id="name" placeholder="Name" value="${product.name}">
        <input type="text" id="price" placeholder="Price" value="${product.price}">
     
       <input type="file" id="fileButton" onchange="uploadImage(event)">
        <div id="imgDiv"><img src="${product.image}" alt=""></div>
        <input type="text" id="category" placeholder="Category" value="${product.category}">
        <button onclick="edit(${id})">Edit</button>`)
            }
        })

    }
}

function edit(id) {
    let token = localStorage.getItem('token')
    if (token) {
        token = JSON.parse(token)
        let name = $('#name').val();
        let price = $('#price').val();
        let image = localStorage.getItem('image')
        let category = $('#category').val();
        let product = {
            name: name,
            price: price,
            image: image,
            category: category
        }
        $.ajax({
            type: 'PUT',
            url: `http://localhost:3000/blogs/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            data: JSON.stringify(product),

            success: () => {
                showHome()
            }
        })
    }
}

function uploadImage(e) {
    let fbBucketName = 'images';
    let uploader = document.getElementById('uploader');
    let file = e.target.files[0];
    let storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {

            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        }, function () {
            let downloadURL = uploadTask.snapshot.downloadURL;
            document.getElementById('imgDiv').innerHTML = `<img src="${downloadURL}" alt="">`
            localStorage.setItem('image', downloadURL);
        });
}

function searchProduct(value) {
    let token = localStorage.getItem('token')
    if (token) {
        token = JSON.parse(token)
        let name = value.toLowerCase()
        console.log(name)
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/blogs/search/findByName?name=${name}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            data: JSON.stringify(name),
            success: (products) => {
                $("#body").html(`
  
  <table class="table" border="1">
  <thead>
    <tr>
      <td>ID</td>
            <td>Content</td>
            <td>Status</td>
            <td>Image</td>
            <td>Date</td>
            <td>Username</td>
            <td>Category</td>
            <td colspan="2">Action</td>
    </tr>
  </thead>
  <tbody id="tbody">
  </tbody>
</table>
    `)
                let html = ''
                products.map(item => {
                    html += `<tr>
            <td>${item.id}</td>
            <td>${item.content}</td>
            <td>${item.status}</td>
            <td><img style="height: 200px;width: 200px" src="${item.image}" alt=""></td>
            <td>${item.date}</td>
            <td>${item.username}</td>
            <td>${item.nameCategory}</td>
            <td><button onclick="remove(${item.id})">Delete</button></td>
            <td><button onclick="showFormEdit(${item.id})">Edit</button></td>                  
                         </tr>`
                })
                $("#tbody").html(html)
            }
        })
    }
}

function showFormLogin() {
    $('#body').html(` 
             <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
\t width="800px" height="600px" viewBox="0 0 800 600" enable-background="new 0 0 800 600" xml:space="preserve">
<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="174.7899" y1="186.34" x2="330.1259" y2="186.34" gradientTransform="matrix(0.8538 0.5206 -0.5206 0.8538 147.9521 -79.1468)">
\t<stop  offset="0" style="stop-color:#FFC035"/>
\t<stop  offset="0.221" style="stop-color:#F9A639"/>
\t<stop  offset="1" style="stop-color:#E64F48"/>
</linearGradient>
<circle fill="url(#SVGID_1_)" cx="266.498" cy="211.378" r="77.668"/>
<linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="290.551" y1="282.9592" x2="485.449" y2="282.9592">
\t<stop  offset="0" style="stop-color:#FFA33A"/>
\t<stop  offset="0.0992" style="stop-color:#E4A544"/>
\t<stop  offset="0.9624" style="stop-color:#00B59C"/>
</linearGradient>
<circle fill="url(#SVGID_2_)" cx="388" cy="282.959" r="97.449"/>
<linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="180.3469" y1="362.2723" x2="249.7487" y2="362.2723">
\t<stop  offset="0" style="stop-color:#12B3D6"/>
\t<stop  offset="1" style="stop-color:#7853A8"/>
</linearGradient>
<circle fill="url(#SVGID_3_)" cx="215.048" cy="362.272" r="34.701"/>
<linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="367.3469" y1="375.3673" x2="596.9388" y2="375.3673">
\t<stop  offset="0" style="stop-color:#12B3D6"/>
\t<stop  offset="1" style="stop-color:#7853A8"/>
</linearGradient>
<circle fill="url(#SVGID_4_)" cx="482.143" cy="375.367" r="114.796"/>
<linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="365.4405" y1="172.8044" x2="492.4478" y2="172.8044" gradientTransform="matrix(0.8954 0.4453 -0.4453 0.8954 127.9825 -160.7537)">
\t<stop  offset="0" style="stop-color:#FFA33A"/>
\t<stop  offset="1" style="stop-color:#DF3D8E"/>
</linearGradient>
<circle fill="url(#SVGID_5_)" cx="435.095" cy="184.986" r="63.504"/>
</svg>


<div class="container">
  <h2>login</h2>
  <form>
    <input type="text" class="email" placeholder="email">
    <br/>
    <input type="text" class="pwd" placeholder="password">
  </form>
  <a href="#" class="link">
    forgot your password ?
  </a>
  <br/>
  <button class="register" onclick="signup()">
    <span>register</span>
  </button>
  <button class="signin" onclick="login()">
    <span>sign in</span>
  </button>
  <h3>your registration is complete !    </h3>
  <h3>your sign in is complete !</h3>
  <div class="reg"></div>
  <div class="sig"></div>

 
 
</div>
`)
}

function login() {
    let username = $('#username').val();
    let password = $('#password').val();

    let user = {
        username: username,
        password: password
    }
    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/auth/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(user),

        success: (token) => {
            localStorage.setItem('token', JSON.stringify(token));

            showNav();
            showHome();
        }
    })
}

function logout() {
    localStorage.clear();
    showFormLogin();
    showNav();
}

function showFormRegister() {
    $('#body').html(` 
             <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
\t width="800px" height="600px" viewBox="0 0 800 600" enable-background="new 0 0 800 600" xml:space="preserve">
<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="174.7899" y1="186.34" x2="330.1259" y2="186.34" gradientTransform="matrix(0.8538 0.5206 -0.5206 0.8538 147.9521 -79.1468)">
\t<stop  offset="0" style="stop-color:#FFC035"/>
\t<stop  offset="0.221" style="stop-color:#F9A639"/>
\t<stop  offset="1" style="stop-color:#E64F48"/>
</linearGradient>
<circle fill="url(#SVGID_1_)" cx="266.498" cy="211.378" r="77.668"/>
<linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="290.551" y1="282.9592" x2="485.449" y2="282.9592">
\t<stop  offset="0" style="stop-color:#FFA33A"/>
\t<stop  offset="0.0992" style="stop-color:#E4A544"/>
\t<stop  offset="0.9624" style="stop-color:#00B59C"/>
</linearGradient>
<circle fill="url(#SVGID_2_)" cx="388" cy="282.959" r="97.449"/>
<linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="180.3469" y1="362.2723" x2="249.7487" y2="362.2723">
\t<stop  offset="0" style="stop-color:#12B3D6"/>
\t<stop  offset="1" style="stop-color:#7853A8"/>
</linearGradient>
<circle fill="url(#SVGID_3_)" cx="215.048" cy="362.272" r="34.701"/>
<linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="367.3469" y1="375.3673" x2="596.9388" y2="375.3673">
\t<stop  offset="0" style="stop-color:#12B3D6"/>
\t<stop  offset="1" style="stop-color:#7853A8"/>
</linearGradient>
<circle fill="url(#SVGID_4_)" cx="482.143" cy="375.367" r="114.796"/>
<linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="365.4405" y1="172.8044" x2="492.4478" y2="172.8044" gradientTransform="matrix(0.8954 0.4453 -0.4453 0.8954 127.9825 -160.7537)">
\t<stop  offset="0" style="stop-color:#FFA33A"/>
\t<stop  offset="1" style="stop-color:#DF3D8E"/>
</linearGradient>
<circle fill="url(#SVGID_5_)" cx="435.095" cy="184.986" r="63.504"/>
</svg>


<div class="container">
  <h2>login</h2>
  <form>
    <input type="text" class="email" placeholder="email">
    <br/>
    <input type="text" class="pwd" placeholder="password">
  </form>
  <a href="#" class="link">
    forgot your password ?
  </a>
  <br/>
  <button class="register" onclick="signup()">
    <span>register</span>
  </button>
  <button class="signin" onclick="login()">
    <span>sign in</span>
  </button>
  <h3>your registration is complete !    </h3>
  <h3>your sign in is complete !</h3>
  <div class="reg"></div>
  <div class="sig"></div>

 
 
</div>
`)
}

function signup() {
    let username = $('#username').val();
    let password = $('#password').val();

    let user = {
        username: username,
        password: password
    }
    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/auth/signup`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(user),

        success: (user) => {
            if(user === 'Username registered'){
                alert('Username registered')
            }else {
                showFormLogin()
            }

        }
    })
}