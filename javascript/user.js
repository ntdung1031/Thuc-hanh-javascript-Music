// const app = {
//     currentIndex: 0,
//     isPlaying: false,
//     isRandom: false,
//     isRepeat: false,
//     listSong: [],
//     songs : [],
//     fetchMusic: function() {
//       return fetch('http://localhost:3000/php_user/get_song.php') // Trả về Promise
//       .then(response => {
//           if (!response.ok) {
//               throw new Error('Network response was not ok');
//           }
//           return response.json();
//       })
//       .then(data => {
//           this.songs = data;
//           console.log(this.songs); // Danh sách bài hát lấy được từ API
//       })
//       .catch(error => console.error('Error fetching songs:', error));
//   },
    
//     // (1/2) Uncomment the line below to use localStorage
//     config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
//     setConfig: function (key, value) {
//       this.config[key] = value;
//       localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
//     },
  
  
//     render: function () {
//       const htmls = this.songs.map((song, index) => {
//         return <div class="song ${index === this.currentIndex ? "active" : ""}" data-index = "${index}">
//                   <div class="thumb"
//                       style="background-image: url('${song.image}')">
//                   </div>
//                   <div class="body">
//                       <h3 class="title">${song.name}</h3>
//                       <p class="author">${song.singer}</p>
//                   </div>
//                   <div class="option">
//                       <i class="fas fa-ellipsis-h"></i>
//                   </div>
//               </div>;
//       });
//       playList.innerHTML = htmls.join("");
//     },
//     defineProperties: function () {
//       Object.defineProperty(this, "currentSong", {
//         get: function () {
//           return this.songs[this.currentIndex];
//         },
//       });
//     },
//     handleEnvents: function () {
//       _this = this;
//       const cdWidth = cd.offsetWidth;
//       // sign.forEach((item, index) => {
//       //     item.onclick = function () {
//       //         console.log(index)
//       //     }
//       //     console.log(item)
//       // })
//       document.addEventListener("DOMContentLoaded", () => {
//         sign.forEach((item, index) => {
//           item.onclick = function () {
//             modal[index].style.display = "block";
//           };
//         });
//         closeForm.forEach((item, index) => {
//           item.onclick = function () {
//             modal[index].style.display = "none";
//           };
//         });
//         // lật cái mảng què này lại
//         Array.from(changSign)
//           .reverse()
//           .forEach((item, index) => {
//             item.onclick = () => {
//               modal.forEach((item, index) => {
//                 item.style.display = "none";
//               });
//               modal[index].style.display = "block";
//             };
//           });
//       });
//       const cdThumAnimate = cdThumb.animate(
//         [
//           {
//             transform: "rotate(360deg)",
//           },
//         ],
//         {
//           duration: 15000,
//           // easing: "linear",
//           iterations: Infinity,
//         }
//       );
//       cdThumAnimate.pause();
//       // xử lí cuộn sẽ thu nhỏ cd
//       document.onscroll = function () {
//         const scrollY = window.scrollY || document.documentElement.scrollTop;
//         const newCdWidth = cdWidth - scrollY;
//         cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
//         cd.style.opacity = newCdWidth / cdWidth;
//       };
//       // xử lí khi người dùng click vào button play
//       playBtn.onclick = function () {
//         if (_this.isPlaying) {
//           audio.pause();
//         } else {
//           audio.play();
//         }
//         audio.ontimeupdate = function () {
//           const { duration, currentTime } = audio;
//           let progressPercent = (currentTime / duration) * 100;
//           progress.value = progressPercent;
//         };
//         // fix bug cái click chậm thì nó bị update
//         progress.oninput = () => {
//           audio.currentTime = (audio.duration / 100) * progress.value;
//         };
//       };
//       // khi song bị được play
//       audio.onplay = () => {
//         _this.isPlaying = true;
//         cdThumAnimate.play();
//         player.classList.add("playing");
//       };
//       // khi song bị pause
//       audio.onpause = () => {
//         _this.isPlaying = false;
//         cdThumAnimate.pause();
//         player.classList.remove("playing");
//       };
//       // khi song ended
//       audio.onended = function () {
//         if (_this.isRepeat) {
//           audio.play();
//         } else {
//           nextBtn.click();
//         }
//       };
//       //   khi next song
//       nextBtn.onclick = function () {
//         if (_this.isRandom) {
//           _this.playRandomSong();
//         } else {
//           app.nextSong();
//         }
//         audio.play();
//         _this.render();
//         _this.scrollToActiveSong();
//       };
  
//       // khi prev song
//       prevBtn.onclick = function () {
//         if (_this.isRandom) {
//           _this.playRandomSong();
//         } else {
//           app.prevSong();
//         }
//         audio.play();
//         _this.render();
//         _this.scrollToActiveSong();
//       };
//       // xử lí random bật tắt
//       randomBtn.onclick = function (e) {
//         _this.isRandom = !_this.isRandom;
//         if (_this.isRandom) {
//           _this.listSong.push(_this.currentIndex);
//         }
//         // _this.setConfig('isRandom', _this.isRandom)
//         randomBtn.classList.toggle("active", _this.isRandom);
//       };
//       // repeat button, Xử lí lặp lại 1 song
//       repeatBtn.onclick = function (e) {
//         _this.isRepeat = !_this.isRepeat;
//         // _this.setConfig('isRepeat', _this.isRepeat)
//         repeatBtn.classList.toggle("active", _this.isRepeat);
//       };
//       playList.onclick = function (e) {
//         // xử lí khi click vào song chuyển đến bài đó
//         const isSong = e.target.closest(".song:not(.active)");
//         const isOption = e.target.closest(".option");
//         if (isSong || isOption) {
//           if (isSong) {
//             _this.currentIndex = Number(isSong.dataset.index);
//             _this.render();
//             _this.loadCurrentSong();
//             audio.play();
//           }
//           // xử lí khi click vào song Option
//           if (isOption) {
//           }
//         }
//       };
//       volume.oninput = function () {
//         audio.volume = volume.value / 100;
//         volume.style.setProperty("--width-before-sound", ${volume.value}%);
//       };
//       $(".volume-icon").onclick = function () {
//         volume.classList.toggle("open");
//         $(".volume span").classList.toggle("open");
//       };
//       if (avt) {
//         avt.onclick = function () {
//           avtList.classList.toggle("close");
//         };
//       }
//       if ($(".btn-avt")) {
//         $(".btn-avt").onclick = function () {
//           $("#fileAvatar").click();
//           $("#fileAvatar").onchange = function (e) {
//             const file = e.target.files[0];
//             if (file) {
//               const reader = new FileReader();
//               reader.onload = function () {
//                 avt.src = reader.result;
//                 localStorage.setItem("avatarImage", reader.result);
//               };
//               reader.readAsDataURL(file);
//             }
//           };
//         };
//       }
//     },
//     scrollToActiveSong: function () {
//       setTimeout(() => {
//         $(".song.active").scrollIntoView({
//           behavior: "smooth",
//           block: "center",
//         });
//       }, 100);
//     },
//     loadCurrentSong: function () {
//       heading.textContent = this.currentSong.name;
//       cdThumb.style.backgroundImage = url('${this.currentSong.image}');
//       audio.src = this.currentSong.path;
//       this.setConfig("currentIndex", this.currentIndex);
//     },
//     loadConfig: function () {
//       this.isRandom = this.config.isRandom;
//       this.isRepeat = this.config.isRepeat;
//       this.currentIndex = this.config.currentIndex || this.currentIndex;
//     },
//     nextSong: function () {
//       this.currentIndex++;
//       if (this.currentIndex >= this.songs.length) {
//         this.currentIndex = 0;
//       }
//       this.loadCurrentSong();
//     },
//     prevSong: function () {
//       this.currentIndex--;
//       if (this.currentIndex < 0) {
//         this.currentIndex = this.songs.length - 1;
//       }
//       this.loadCurrentSong();
//     },
//     playRandomSong: function () {
//       // this.currentIndex = newIndex
//       // this.loadCurrentSong()
//       // audio.play()
//       let newIndex;
//       do {
//         newIndex = Math.floor(Math.random() * this.songs.length);
//       } while (
//         newIndex === this.currentIndex ||
//         this.listSong.includes(newIndex)
//       );
//       this.listSong.push(newIndex);
//       if (this.listSong.length === this.songs.length) {
//         this.listSong = [];
//       }
  
//       console.log(this.listSong);
//       this.currentIndex = newIndex;
//       this.loadCurrentSong();
//     },
  
//     start: function () {
//       // gán cấu hình từ config vào ứng dụng
//       this.loadConfig();
//       // lấy dữ liệu
//       // this.fetchMusic();
//       // định nghĩa thuộc tính cho Object
//       this.defineProperties();
//       // xử lí sự kiện Dom event
//       this.handleEnvents();
//       // tải thông tin bài hát đầu tiên vào UI khi load lần đầu
//       this.loadCurrentSong();
  
//       // render ra màn hành
//       this.render();
//       // hiển thị trạng thái ban đầu của btn repeat và random
//       // randomBtn.classList.toggle('active', this.isRandom)
//       // repeatBtn.classList.toggle('active', this.isRepeat)
//     },
//   };
//   app.fetchMusic().then(() => {
//       app.start(); // Chỉ gọi start sau khi đã lấy được bài hát
//   });
  
 