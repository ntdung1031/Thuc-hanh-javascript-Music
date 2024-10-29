<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music player</title>
    <link rel="shortcut icon" href="#" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="./base.css">
    <link rel="stylesheet" href="./style.css">
</head>

<body>
<!-- <?php

?> -->
    <div class="sign-parent fixed top-2 right-20 <?php session_start();  echo isset($_SESSION['username']) && $_SESSION['user_id'] ? 'close' : ''; ?>" >
        <div class="sign flex gap-3 items-center">
            <button class="sign-in">Sign In</button>
            <button class="sign-up">Sign Up</button>
        </div>
    </div>
    <div class="user fixed top-2 right-20 flex">
        <?php 
        if(isset($_SESSION['username']) && $_SESSION['user_id']) {
            echo '<p class="name">';
            echo $_SESSION['username'];
            echo '</p>';
            echo '<img src="./assets/image/avt1.jpg" alt="">';
        }
        ?>
        
    </div>
    <?php
    // Include file PHP để tự động thực thi
    // include 'add_user.php'; // Hoặc require 'add_user.php';
    ?>
    


    <div class="player ">
        <!-- Dashboard -->
        <div class="dashboard">
            <!-- Header -->
            <header>
                <h2></h2>
            </header>

            <!-- CD -->
            <div class="cd">
                <div class="cd-thumb"
                    style="background-image: url('https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg')">
                </div>
            </div>

            <!-- Control -->
            <div class="control">
                <div class="btn btn-repeat" title="loop">
                    <i class="fas fa-redo"></i>
                </div>
                <div class="btn btn-prev">
                    <i class="fas fa-step-backward"></i>
                </div>
                <div class="btn btn-toggle-play">
                    <i class="fas fa-pause icon-pause"></i>
                    <i class="fas fa-play icon-play"></i>
                </div>
                <div class="btn btn-next">
                    <i class="fas fa-step-forward"></i>
                </div>
                <div class="btn btn-random" title="Random">
                    <i class="fas fa-random"></i>
                </div>
            </div>

            <input id="progress" class="progress" type="range" value="0" step="1" min="0" max="100">
            <div class="volume">
                <span class="open">Volume ở đây nè =></span>
                <i class="fa fa-volume-up volume-icon"></i>
                <input type="range" id="volume" class="sound-bar" value="100" step="1" min="0" max="100">
            </div>
            <audio id="audio" src=""></audio>
        </div>

        <!-- Playlist -->
        <div class="playlist">

        </div>
    </div>

    <!-- -------------------sign in  ---------------------------------------- -->
     <!--  form sign IN -->
     <div class="modal " style="display: none;" >
        <div class="modal-lay">
            <div class="modal-sign-in-main modal-body">
                <i class="fa-solid fa-xmark close-form"></i>
                <h2 class="modal-signIn-title">Hello Again!</h2>
                <p class="modal-signIn-para">Welcome back to sign in.</p>
                <form action="./login.php" class="form auth-form" id="signIn-form" method="post">
                    <div class="group-form">
                        <div class="form-text-input">
                            <input type="email" name="signInEmail" class="form-input" placeholder="Email" required
                                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$">
                            <img src="./assets/image/message.svg" alt="" class="img-mess">
                            <img src="assets/image/form-error.svg" alt="" class="img-err">
                        </div>
                        <p class="form-err">Email is not in correct format</p>
                    </div>
                    <div class="group-form">
                        <div class="form-text-input">
                            <input type="password" name="signInpsw" class="form-input" placeholder="Password" minlength="6"
                                required>
                            <img src="./assets/image/lock.svg" alt="" class="img-mess">
                            <img src="assets/image/form-error.svg" alt="" class="img-err">
                        </div>
                        <p class="form-err">Password must be at least 6 characters</p>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" name="" id="checked-label" hidden>
                        <label for="checked-label">Set as default card</label>
                        <a href="#!" class="forgot-pass">Forgot password?</a>
                    </div>
                    <button type="submit" class="btn-sign-in">Sign In</button>
                    <div class="signIn-gg">
                        <img src="./assets/image/google.svg" alt="" class="gg">
                        <p class="gg-desc">Sign in with Google</p>
                    </div>

                </form>

                <p class="dont-SignIn">Don’t have an account yet? <a href="#!">Sign Up</a></p>
            </div>
        </div>
    </div>

    <!-- ----------------------sign up ------------- -->
       <!-- form signUp -->
       <div class="modal" style="display: none;" >
        <div class="modal-lay">
            <div class="modal-sign-in-main modal-body">
                <i class="fa-solid fa-xmark close-form"></i>
                <h2 class="modal-signIn-title">Sign Up</h2>
                <p class="modal-signIn-para">
                    Create an account and enjoy your own music!</p>
                <form action="add_user.php" method="post" class="form auth-form" id="signup-form">
                    <div class="group-form">
                        <div class="form-text-input">
                            <input type="text" name="nameSignUp" class="form-input" placeholder="Name" required
                            pattern="^[\p{L} ]+$">
                            <img src="./assets/image/message.svg" alt="" class="img-mess">
                            <img src="assets/image/form-error.svg" alt="" class="img-err">
                        </div>
                        <p class="form-err">Please enter letters only</p>
                    </div>
                    <div class="group-form">
                        <div class="form-text-input">
                            <input type="email" name="signUpEmail" class="form-input" placeholder="Email" required
                                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$">
                            <img src="./assets/image/message.svg" alt="" class="img-mess">
                            <img src="assets/image/form-error.svg" alt="" class="img-err">
                        </div>
                        <p class="form-err">Email is not in correct format</p>
                    </div>
                    <div class="group-form">
                        <div class="form-text-input">
                            <input type="password" name="pswSignUp" class="form-input" placeholder="Password" minlength="6"
                                required>
                            <img src="./assets/image/lock.svg" alt="" class="img-mess">
                            <img src="assets/image/form-error.svg" alt="" class="img-err">
                        </div>
                        <p class="form-err">Password must be at least 6 characters</p>
                    </div>
                    <div class="group-form">
                        <div class="form-text-input">
                            <input type="password" name="repswSignUp" class="form-input" placeholder="Confirm password"
                                minlength="6" required>
                            <img src="./assets/image/lock.svg" alt="" class="img-mess">
                            <img src="assets/image/form-error.svg" alt="" class="img-err">
                        </div>
                        <p class="form-err">Password must be at least 6 characters</p>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" name="" id="checked-label-sign-up" hidden>
                        <label for="checked-label-sign-up">You are not lacking in ability</label>
                        <a href="#!" class="forgot-pass">Forgot password?</a>
                    </div>
                    <button type="submit" class="btn-sign-in">Sign Up</button>
                    <div class="signIn-gg">
                        <img src="./assets/image/google.svg" alt="" class="gg">
                        <p class="gg-desc">Sign up with Google</p>
                    </div>

                </form>

                <p class="dont-SignIn">Already have an account? <a href="#!">Sign In</a></p>
            </div>
        </div>
    </div>
     <div class="toast-container content">
    </div>

    <!-- <div class="c">
    </div> -->
    <!-- <p style="font-weight: 700;">aa</p> -->

    <!-- Design from: https://static.collectui.com/shots/3671744/musicloud-revolutionary-app-for-music-streaming-large -->
    <script src="./javascript/main.js"></script>
    <script src="./javascript/user.js"></script>
</body>

</html>