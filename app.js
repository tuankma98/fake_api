// - CRUD API
// - Create: Tạo mới -> POST
// - Read: Đọc và lấy dữ liệu -> GET
// -Update: Chỉnh sửa -> PUT
// -Delete: Xoá -> DELETE


var courseApi = 'http://localhost:3000/courses';

function start() {
    getCourses(renderCourses);
    handleCreateForm();

}

start();  // render



// functions

function getCourses(callback) {
    fetch(courseApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
};

function createCourese(data, callback) {  // tao ra du lieu
    var options ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data)
    };
    fetch(courseApi, options)
        .then(function(response) {
           return response.json();
        })
        .then(callback);
}

///////
function handleCreateForm() {    // xử lí tạo ra khoá học
    var createBtn = document.querySelector('#create');
    
    createBtn.onclick = function() {
      var name = document.querySelector('input[name="name"]').value;
      var description = document.querySelector('input[name="description"]').value;
      
      var formData = {
          title: name,
          description: description
      }
      console.log(formData);

      createCourese(formData, function() {
        getCourses(renderCourses);
      });
    }
}

function handleDeleteCourse(id) {   // xoá đi content
   
    var options ={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
    };
    fetch(courseApi + '/' + id, options)
        .then(function(response) {
           return response.json();
        })
        .then(function() {
           // getCourses(renderCourses);
          var courseItem = document.querySelector('.course-item-' + id)
          if(courseItem) {
            courseItem.remove();
          }
        });
}

///// update : chỉnh sửa
function handleUpdateCourse(id) {
    
}

///////
function renderCourses(courses) {  // render ra trình duyệt ( GET)
    var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function(course) {
        return `
            <li class="course-item-${course.id}">
                <h2>${course.title}</h2>
                <p>${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xoá</button>
                <button>Chỉnh sửa</button>
            </li>
        `;
    });
    listCoursesBlock.innerHTML = htmls.join('');
}
