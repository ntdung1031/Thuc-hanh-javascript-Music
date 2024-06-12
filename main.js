
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "DUNG_LIST_MUSIC";


const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd")
const playBtn = $(".control .btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playList = $(".playlist")
const volume = $('#volume')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    listSong: [],
    // (1/2) Uncomment the line below to use localStorage
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    songs: [
        {
            name: "Anh chẳng thể",
            singer: "Raftaar x Salim Merchant x Karma",
            path: "./assets/music/Anh-chang-the.mp3",
            image:
                "https://i3.ytimg.com/vi/mZcFsmN2YB4/hqdefault.jpg"
        },
        {
            name: "Chưa kịp nói lời yêu em",
            singer: "Raftaar x Fortnite",
            path: "./assets/music/Chua-kip-noi-loi-yeu-em.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
            name: "Có em",
            singer: "Raftaar x Salim Merchant x Karma",
            path: "./assets/music/Co-em.mp3",
            image:
                "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
            name: "Những lời hứa bỏ quên",
            singer: "Raftaar x Brobha V",
            path:
                "./assets/music/Nhung-loi-hua-bo-quen.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
            name: "Vì anh có biết",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "./assets/music/Vi-anh-co-biet.mp3",
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
            name: "Yêu em rất nhiều",
            singer: "Raftaar",
            path: "./assets/music/yeu-em-rat-nhieu.mp3",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
            name: "Lửng lơ",
            singer: "Raftaar",
            path: "./assets/music/Lung-lo.mp3",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
            name: "Thời gian sẽ trả lời",
            singer: "Raftaar",
            path: "./assets/music/Thoi-gian-se-tra-loi.mp3",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
            name: "Lỗi duyên tại ý trời",
            singer: "Raftaar",
            path: "./assets/music/Loi-duyen-tai-y-troi.mp3",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
            name: "Em vội quên ",
            singer: "Raftaar x kr$na",
            path:
                "./assets/music/Em-voi-quen.mp3",
            image:
                "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
            name: "Nắng cũ",
            singer: "Raftaar x Harjas",
            path: "./assets/music/Nang-cu.mp3",
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
            name: "Rượu mừng hóa người dưng",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "./assets/music/Ruou-mung-hoa-nguoi-dung.mp3",
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        }
    ],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `<div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}">
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
            </div>`
        })
        playList.innerHTML = htmls.join('')

    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEnvents: function () {
        _this = this
        const cdWidth = cd.offsetWidth

        const cdThumAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000,
            // easing: "linear",
            iterations: Infinity
        })
        cdThumAnimate.pause()
        // xử lí cuộn sẽ thu nhỏ cd
        document.onscroll = function () {
            const scrollY = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollY
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }
        // xử lí khi người dùng click vào button play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            audio.ontimeupdate = function () {
                const { duration, currentTime } = audio
                let progressPercent = (currentTime / duration) * 100
                progress.value = progressPercent
            }
            // fix bug cái click chậm thì nó bị update
            progress.oninput = () => {
                audio.currentTime = (audio.duration / 100) * progress.value
            }
        }
        // khi song bị được play 
        audio.onplay = () => {
            _this.isPlaying = true
            cdThumAnimate.play()
            player.classList.add('playing')
        }
        // khi song bị pause
        audio.onpause = () => {
            _this.isPlaying = false
            cdThumAnimate.pause()
            player.classList.remove('playing')
        }
        // khi song ended
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }
        //   khi next song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                app.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // khi prev song
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                app.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        // xử lí random bật tắt
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom
            if (_this.isRandom) {
                _this.listSong.push(_this.currentIndex)

            }
            // _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }
        // repeat button, Xử lí lặp lại 1 song 
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat
            // _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }
        playList.onclick = function (e) {
            // xử lí khi click vào song chuyển đến bài đó
            const isSong = e.target.closest('.song:not(.active)')
            const isOption = e.target.closest('.option')
            if (isSong || isOption) {
                if (isSong) {
                    _this.currentIndex = Number(isSong.dataset.index)
                    _this.render()
                    _this.loadCurrentSong()
                    audio.play()
                }
                // xử lí khi click vào song Option
                if (isOption) {

                }
            }
        }
        volume.oninput = function () {
            audio.volume = volume.value / 100
            volume.style.setProperty('--width-before-sound', `${volume.value}%`)
        }
        $('.volume-icon').onclick = function () {
            volume.classList.toggle('open')
            $('.volume span').classList.toggle('open')
        }

    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView(
                {
                    behavior: "smooth",
                    block: "center",
                })
        }, 100)
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
        this.setConfig('currentIndex', this.currentIndex)
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
        this.currentIndex = this.config.currentIndex || this.currentIndex;
    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        // this.currentIndex = newIndex
        // this.loadCurrentSong()
        // audio.play()
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex || this.listSong.includes(newIndex))
        this.listSong.push(newIndex)
        if (this.listSong.length === this.songs.length) {
            this.listSong = []
        }

        console.log(this.listSong)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    start: function () {
        // gán cấu hình từ config vào ứng dụng
        this.loadConfig()
        // định nghĩa thuộc tính cho Object
        this.defineProperties()
        // xử lí sự kiện Dom event
        this.handleEnvents()
        // tải thông tin bài hát đầu tiên vào UI khi load lần đầu
        this.loadCurrentSong()

        // render ra màn hành 
        this.render()

        // hiển thị trạng thái ban đầu của btn repeat và random
        // randomBtn.classList.toggle('active', this.isRandom)
        // repeatBtn.classList.toggle('active', this.isRepeat)
    }
}
app.start()


