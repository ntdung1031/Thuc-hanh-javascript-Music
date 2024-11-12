const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "DUNG_LIST_MUSIC";

const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".control .btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playList = $(".playlist");
const volume = $("#volume");
// ---sign
const sign = $$(".sign button");
const modal = $$(".modal");
const closeForm = $$(".close-form");
let changSign = $$(".dont-SignIn a, .dont-SignUp a");
const avt = $(".avt-img");
const avtList = $(".avt-list");
const logout = $("#logout");

// 

// window load
window.addEventListener("load", function () {
  const savedAvatar = localStorage.getItem("avatarImage");
  if (savedAvatar) {
    avt.src = savedAvatar;
  }
});
// window load
// handle logout

if (logout) {
  logout.onclick = function () {
    // Gọi đến logout.php để hủy session trên server
    fetch("/login.php")
      .then((response) => {
        if (response.ok) {
          // Xóa thông tin trên client-side sau khi logout thành công
          localStorage.removeItem("avatarImage");
          sessionStorage.removeItem("user_id");
          sessionStorage.removeItem("username");
          avt.src = "./assets/image/avt1.jpg"; // Đặt lại avatar mặc định

          // Chuyển hướng về trang login
          window.location.href = "./php_user/logout.php";
        } else {
          console.error("Logout failed on server.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };
}
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  listSong: [],
  songs : [],
  fetchMusic: function() {
   return  fetch('http://localhost:3000/php_user/get_song.php') // Trả về Promise
    .then(response => response.json()
        )
    .then(data => {
        this.songs = data.songs;
       // Danh sách bài hát lấy được từ API
    })
    .catch(error => console.error('Error fetching songs:', error));
},
  
  // (1/2) Uncomment the line below to use localStorage
  config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `<div class="song ${index === this.currentIndex ? "active" : ""}" data-index = "${index}">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`;
    });
    playList.innerHTML = htmls.join("");
    // alert("render");
},
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEnvents: function () {
    _this = this;
    const cdWidth = cd.offsetWidth;
    // document.addEventListener("DOMContentLoaded", () => {
      sign.forEach((item, index) => {
        item.onclick = function () {
        console.log(item,index);

          modal[index].style.display = 'block';
        };
      });
      closeForm.forEach((item, index) => {
        item.onclick = function () {
          modal[index].style.display = 'none';
        };
      });
      // lật cái mảng què này lại
      Array.from(changSign)
        .reverse()
        .forEach((item, index) => {
          item.onclick = () => {
            modal.forEach((item, index) => {
              item.style.display = "none";
            });
            modal[index].style.display = "block";
          };
        });
    // });
    const cdThumAnimate = cdThumb.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        duration: 15000,
        // easing: "linear",
        iterations: Infinity,
      }
    );
    cdThumAnimate.pause();
    // xử lí cuộn sẽ thu nhỏ cd
    document.onscroll = function () {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollY;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    // xử lí khi người dùng click vào button play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      audio.ontimeupdate = function () {
      const { duration, currentTime } = audio;
        let progressPercent = (currentTime / duration) * 100;
        progress.value = progressPercent;
      };
         
      progress.oninput = () => {
        if (audio.readyState >= 2) {  // Kiểm tra nếu audio đã sẵn sàng
          let seek = (audio.duration / 100) * progress.value;
          audio.currentTime = seek;  // Gán `currentTime`
          console.log(progress.value, audio.duration, audio.currentTime, seek);
        } else {
          console.warn("Audio chưa sẵn sàng để cập nhật currentTime");
        }
    };   
    };
    
    // khi song bị được play
    audio.onplay = () => {
      _this.isPlaying = true;
      cdThumAnimate.play();
      player.classList.add("playing");
    };
    // khi song bị pause
    audio.onpause = () => {
      _this.isPlaying = false;
      cdThumAnimate.pause();
      player.classList.remove("playing");
    };
    // khi song ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    //   khi next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        app.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // khi prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        app.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    // xử lí random bật tắt
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      if (_this.isRandom) {
        _this.listSong.push(_this.currentIndex);
      }
      // _this.setConfig('isRandom', _this.isRandom)
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    // repeat button, Xử lí lặp lại 1 song
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      // _this.setConfig('isRepeat', _this.isRepeat)
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };
    playList.onclick = function (e) {
      // xử lí khi click vào song chuyển đến bài đó
      const isSong = e.target.closest(".song:not(.active)");
      const isOption = e.target.closest(".option");
      if (isSong || isOption) {
        if (isSong) {
          _this.currentIndex = Number(isSong.dataset.index);
          _this.render();
          _this.loadCurrentSong();
          audio.play();
        }
        // xử lí khi click vào song Option
        if (isOption) {
        }
      }
    };
    volume.oninput = function () {
      audio.volume = volume.value / 100;
      volume.style.setProperty("--width-before-sound", `${volume.value}%`);
    };
    $(".volume-icon").onclick = function () {
      volume.classList.toggle("open");
      $(".volume span").classList.toggle("open");
    };
    if (avt) {
      avt.onclick = function () {
        avtList.classList.toggle("close");
      };
    }
    if ($(".btn-avt")) {
      $(".btn-avt").onclick = function () {
        $("#fileAvatar").click();
        $("#fileAvatar").onchange = function (e) {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function () {
              avt.src = reader.result;
              localStorage.setItem("avatarImage", reader.result);
            };
            reader.readAsDataURL(file);
          }
        };
      };
    }
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
    this.setConfig("currentIndex", this.currentIndex);
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
    this.currentIndex = this.config.currentIndex || this.currentIndex;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    // this.currentIndex = newIndex
    // this.loadCurrentSong()
    // audio.play()
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (
      newIndex === this.currentIndex ||
      this.listSong.includes(newIndex)
    );
    this.listSong.push(newIndex);
    if (this.listSong.length === this.songs.length) {
      this.listSong = [];
    }

    console.log(this.listSong);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  start: function () {
    // gán cấu hình từ config vào ứng dụng
    this.loadConfig();
    // lấy dữ liệu
    // this.fetchMusic();
    // định nghĩa thuộc tính cho Object
    this.defineProperties();
    // xử lí sự kiện Dom event
    this.handleEnvents();
    // tải thông tin bài hát đầu tiên vào UI khi load lần đầu
    // if(this.songs.length > 0){
        this.loadCurrentSong(); // Gọi loadCurrentSong chỉ khi đã có bài hát
        this.render(); // Render danh sách bài hát
    // }

    // render ra màn hành
    // this.render();
    // hiển thị trạng thái ban đầu của btn repeat và random
    // randomBtn.classList.toggle('active', this.isRandom)
    // repeatBtn.classList.toggle('active', this.isRepeat)
  },
};
 app.fetchMusic().then(() => {
     app.start(); // Chỉ gọi start sau khi đã lấy được bài hát
  });
// ----------------------------------------------------------------toast ----------------------------------------------------------------
// Toast function

// submitSign.forEach((item, index) => {
//     item.onclick = function () {
//         showSuccessToast()
//     }
// })

function toast({ title = "", message = "", type = "", duration = 3000 }) {
  const main = $(".toast-container");
  if (main) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    const icons = {
      success: "fa-solid fa-circle-check",
      info: "fa-solid fa-circle-info",
      warning: "fa-solid fa-triangle-exclamation",
      error: "fa-solid fa-triangle-exclamation",
    };
    // console.log(icons[succes])
    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slidEInLeft linear 0.5s, fadeOut linear 0.3s ${(
      duration / 1000
    ).toFixed(2)}s forwards`;
    toast.innerHTML = `
             <div class="toast-icon-check">
                <i class="${icons[type]}"></i>
            </div>
            <div class="toast-body">
                <h3 class="toast-title">${title}</h3>
                <p class="toast-msg">${message}</p>
            </div>
            <div class="toast-close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        `;
    main.appendChild(toast);
    const autoRemoveId = setTimeout(() => {
      main.removeChild(toast);
    }, duration + 1000);
    const closeBtn = toast.querySelector(".toast-close");
    closeBtn.addEventListener("click", () => {
      main.removeChild(toast);
      clearTimeout(autoRemoveId);
    });
  }
}
function showSuccessToast() {
  toast({
    title: "Thành công",
    message: "Bạn đã thành công tạo thành công tài khoản",
    type: "success",
    duration: 5000,
  });
}
function showErrorToast() {
  toast({
    title: "Thất bại",
    message: "Bạn đã Thất bại đéo mở thành công công",
    type: "error",
    duration: 5000,
  });
}
function showWarningToast() {
  toast({
    title: "Cảnh báo",
    message: "Bạn đã rất ngu nên đéo mở thành công công",
    type: "warning",
    duration: 5000,
  });
}
function showInfoToast() {
  toast({
    title: "Thông tin",
    message: "Bạn đã bị lộ thông tin để mở thành công công",
    type: "info",
    duration: 5000,
  });
}
// --------------------------------------------------------
// const tesst = $('.content.content-btn')
// Bắt sự kiện scroll
// window.addEventListener('scroll', function () {
//     // Kiểm tra xem blockA có trong viewport không
//     const testPos = tesst.getBoundingClientRect()
//     // console.log(testPos.top, testPos.bottom, window.innerHeight)
//     if (Math.floor(testPos.bottom) <= window.innerHeight) {
//         console.log(1)
//     }
// });

// us---------------------------------------------------------------------------------------------------------------- err---
// const form = document.getElementById('signup-form');
const submitSign = $$(".btn-sign-in");
console.log(submitSign);
const formSumit = $$(".form");
document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn chặn việc gửi form mặc định
  console.log("Form submitted!"); // In ra m
  // Lấy dữ liệu từ form
  const formData = new FormData(this);

  // Gửi dữ liệu bằng AJAX
  fetch("add_user.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      // Hiển thị thông báo phản hồi từ server
      // document.getElementById('response-message').innerHTML = data;
      modal.forEach((item, index) => {
        item.style.display = "none";
      });
      modal[0].style.display = "block";
      showSuccessToast();
    })
    .catch((error) => console.error("Lỗi:", error));
});
