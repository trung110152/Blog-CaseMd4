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
                // console.log(blogs);
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
    if(token){
        if(token.role === 'member'){
            $('#nav').html(`
    <button onclick="showFormAdd()">Add</button>
    <button onclick="showHome()">Home</button>
    <button onclick="logout()">logout</button>
    <button onclick="showMyList()">My List</button>
    <input type="search" id="search" placeholder="Enter name" onkeyup="searchProduct(this.value)">
    `)} else {
            $('#nav').html(`

    <button onclick="userManager()">User Manager</button>
    <button onclick="logout()">logout</button>
    <button onclick="showHome()">Home</button>
    <input type="search" id="search" placeholder="Enter name" onkeyup="searchProduct(this.value)">
    `)
        }

    } else {
        $('#nav').html(`
    <button onclick="showFormLogin()">Login</button>
    <button onclick="showFormRegister()">Register</button>
    `)
    }
}
 function showMyList() {
     let token = localStorage.getItem('token')
     if(token) {
         token = JSON.parse(token)
         console.log(token, 2)
         $.ajax({
             type: 'GET',
             url: `http://localhost:3000/blogs/myList/${token.idUser}`,
             headers: {
                 'Content-Type': 'application/json',
                 Authorization: 'Bearer ' + token.token
             },
             success: (blogs) => {
                 let html = '';

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
            <td><button onclick="showFormEdit(${item.id})">Edit</button></td>
 
          
        </tr>`
                 })
                 $('#tbody').html(html)
             }


         })

     }

 }

function userManager(){
    let token = localStorage.getItem('token')
    if(token){
        token = JSON.parse(token)
        // console.log(token.role)
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/auth',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            success: (users) => {
                // console.log(users);
                let html = '';
                    users.map(item => {
                        html += `<tr>
             <td>${item.id}</td>
            <td>${item.username}</td>
            <td>${item.role}</td>
            <td><button onclick="lock(${item.id})">${item.status}</button></td>
            <td><button onclick="deleteRemove(${item.id})">Delete</button></td>
        </tr>`
                    })
                    $('#tbody').html(html)
            }
        })
    }
}

function lock(id) {
    if(confirm('lock ?')){
        let token = localStorage.getItem('token')
        if (token) {
            token = JSON.parse(token)
            $.ajax({
                type: 'PUT',
                url: `http://localhost:3000/auth/lock/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token.token
                },
                success: () => {
                    userManager();
                }
            })
        }
    }

}

function add() {
    let token = localStorage.getItem('token')
    // console.log(token,154)
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
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3000/blogs/blogCategory',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token.token
                    },
                    data: JSON.stringify(blogCategory),

                    success: (blogCategory) => {
                        console.log(blogCategory,197)
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
            success: (blogs) => {
                $('#body').html(`
<input type="text" id="content" placeholder="content" value="${blogs.content}">     
       <input type="file" id="fileButton" onchange="uploadImage(event)">
        <div id="imgDiv"><img src="${blogs.image}" alt=""></div>
        <button onclick="edit('${id}')">Edit</button>`)
            }
        })

    }
}

function edit(id) {
    let token = localStorage.getItem('token')
    if (token) {
        token = JSON.parse(token)
        let content = $('#content').val();
        let image = localStorage.getItem('image')
        let blog = {
            content: content,
            image: image,
        }
        $.ajax({
            type: 'PUT',
            url: `http://localhost:3000/blogs/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            data: JSON.stringify(blog),

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
            uploader.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
             <input type="text" id = "username" placeholder="username"> 
             <input type="password" id = "password" placeholder="password"> 
             <button onclick="login()">Login</button>
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
            if(token === "Username is not existed" ||token === 'Password is wrong' ){
                alert('Can not')
                showNav();
            }else{
                localStorage.setItem('token', JSON.stringify(token));
                showNav();
                showHome();
            }


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
             <input type="text" id = "username" placeholder="username"> 
             <input type="password" id = "password" placeholder="password"> 
             <button onclick="signup()">Signup</button>
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