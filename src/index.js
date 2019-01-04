document.addEventListener('DOMContentLoaded', () => {
    //required variables
    const you_lost = document.getElementById("you_lost")
    const minGap = 150;
    const maxGap = 300;
    const obstacleSprites = ['assets/images/obstacles/4b21adf278d1d70.gif', 'assets/images/obstacles/524246e9f66085a32b9cd46aedab9266_w200.gif', 'assets/images/obstacles/20772690_90x90.gif', 'assets/images/obstacles/burglar_balls.gif', 'assets/images/obstacles/garry_500-5.png', 'assets/images/obstacles/jellyfish.gif', 'assets/images/obstacles/pogoSquidward.gif', 'assets/images/obstacles/krabby_patty.png'];

    const usersApi = 'http://localhost:3000/api/v1/users'

    const leaderBoard = document.getElementById('leaderBoard')
    const runner_Game = document.getElementById('runner_Game')



    //obstacle array
    let myObstacles = [];

    let jump_frame = 0

    //player_frames

    const playerJumpingFrame = ['assets/images/sponge_bob_moving/moving_spongebob-0.png', 'assets/images/sponge_bob_moving/moving_spongebob-0.png', 'assets/images/sponge_bob_moving/moving_spongebob-0.png', 'assets/images/sponge_bob_moving/moving_spongebob-1.png', 'assets/images/sponge_bob_moving/moving_spongebob-1.png', 'assets/images/sponge_bob_moving/moving_spongebob-1.png', 'assets/images/sponge_bob_moving/moving_spongebob-2.png', 'assets/images/sponge_bob_moving/moving_spongebob-2.png', 'assets/images/sponge_bob_moving/moving_spongebob-2.png', 'assets/images/sponge_bob_moving/moving_spongebob-3.png', 'assets/images/sponge_bob_moving/moving_spongebob-3.png', 'assets/images/sponge_bob_moving/moving_spongebob-3.png', 'assets/images/sponge_bob_moving/moving_spongebob-4.png',
    'assets/images/sponge_bob_moving/moving_spongebob-4.png', 'assets/images/sponge_bob_moving/moving_spongebob-4.png', 'assets/images/sponge_bob_moving/moving_spongebob-5.png', 'assets/images/sponge_bob_moving/moving_spongebob-5.png', 'assets/images/sponge_bob_moving/moving_spongebob-5.png', 'assets/images/sponge_bob_moving/moving_spongebob-6.png', 'assets/images/sponge_bob_moving/moving_spongebob-6.png', 'assets/images/sponge_bob_moving/moving_spongebob-6.png', 'assets/images/sponge_bob_moving/moving_spongebob-7.png', 'assets/images/sponge_bob_moving/moving_spongebob-7.png', 'assets/images/sponge_bob_moving/moving_spongebob-7.png', 'assets/images/sponge_bob_moving/moving_spongebob-8.png', 'assets/images/sponge_bob_moving/moving_spongebob-8.png', 'assets/images/sponge_bob_moving/moving_spongebob-8.png', 'assets/images/sponge_bob_moving/moving_spongebob-9.png', 'assets/images/sponge_bob_moving/moving_spongebob-9.png', 'assets/images/sponge_bob_moving/moving_spongebob-9.png']



    //check each interval of time has passed (150ms)
    const eachInterval = (n) => {
        return runnerGame.frame % n === 0
    }

    //choose a randome sprite
    const randomSprite = () => {
        let i = Math.floor(Math.random() * (obstacleSprites.length));
        return obstacleSprites[i]
    }

    //randomGap
    const randomGap = () => {
        return Math.floor(minGap + Math.random() * (maxGap - minGap + 1));
    }

    //score
    const score = {
        x: 400,
        y: 50,
        update: function(text){
            runnerGame.context.fillStyle = '#FFF56C';
            runnerGame.context.font = '30px Slackey';
            runnerGame.context.fillText(text,this.x,this.y)
        }
    }

    //Text

    const text = (text, font_size, x, y) => {
        runnerGame.context.fillStyle = '#FFF56C';
        runnerGame.context.font = `${font_size} Slackey`;
        runnerGame.context.fillText(text,x,y)
    }

    //Loads the game area

    const runnerGame = {
        // load the canvas
        canvas: document.querySelector('canvas'),
        start: function(){
            myObstacles = []
            // this.gameOn = false;
            this.gameOver = false;
            this.canvas.height = 400;
            this.canvas.width = 600;
            this.context = this.canvas.getContext('2d')
            //counts how many times we run the update function
            this.frame = 0
            this.score = 0
            score.update("Score: 0")
            this.interval = setInterval(this.update, 8)
            document.addEventListener('keydown', (event) => {
                if(!event.repeat){
                    if(event.which === 32){
                        player.speedY = -2;
                    }
                }
            });
        },
        //update the sprites in our game area
        update: function(){
            for(let obstacle of myObstacles){
                if(player.collide(obstacle)){
                    runnerGame.gameOver = true;
                }
            }

            if(runnerGame.gameOver){
            //    runnerGame.canvas.display = 'none'

            //    let you_lost = document.createElement('div')
            //    you_lost.id = 'you_lost'
                this.gameOn = false;
                runner_Game.style.display = 'none'
               let lost = document.querySelector('h1')
               lost.innerHTML = `You scored ${Math.floor(runnerGame.score)} points!`
            //    let plankton = document.createElement('img')
            //    plankton.className = "lost_pic"
            //    plankton.src = 'assets/images/-plankton-sticker-spongebob-squarepants-39750396-500-500.gif'

            //    let dying_spongebob_pic = document.createElement('img')
            //    dying_spongebob_pic.className = "lost_pic"
            //    dying_spongebob_pic.src = 'assets/images/you_lost.gif'


            //    let button = document.createElement('BUTTON')
            //    button.innerText = 'Play Again?'
            //    button.id = "button"

            //    lost.innerHTML = "YOU LOST!"

            //    you_lost.appendChild(lost)
            //    you_lost.appendChild(dying_spongebob_pic)
            //    you_lost.appendChild(plankton)
            //    you_lost.appendChild(button)

            //    document.body.insertBefore(you_lost,document.body.childNodes[0])
                you_lost.style.display = 'block'
               runnerGame.stop()
            }


            runnerGame.clear();
            // Creates sprite if passed 150 ms
            if (eachInterval(randomGap())){
                myObstacles.push(new Obstacle())
                runnerGame.frame = 0;
            }


            if (runnerGame.score > 30){
                for(let obstacle of myObstacles){
                    obstacle.x -= 1.4;
                    obstacle.create();
    
                }
            }

            if (runnerGame.score > 20){
                for(let obstacle of myObstacles){
                    obstacle.x -= 1.2;
                    obstacle.create();
    
                }
            }

            if (runnerGame.score < 20){
                for(let obstacle of myObstacles){
                    obstacle.x -= 1;
                    obstacle.create();
    
                }
            }

            player.newPosition();
            player.create();
            runnerGame.frame++;
            runnerGame.score += 0.01;
            score.update("Score: " + Math.floor(runnerGame.score))
        },
        //clears the sprites in the game area
        clear: function(){
            this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        },
        stop: function(){
            clearInterval(this.interval);
        }


    }

    //Player

    const player = {
        height: 70,
        width: 70,
        // Player's x & y are not dymanic. Not reading the runnerGame attributes
        x: 0,
        y: 330, //very confused with this
        speedY: 0,
        create: function(){
            let image = new Image()
            image.src = playerJumpingFrame[jump_frame]
            runnerGame.context.drawImage(image, this.x, this.y, this.width, this.height)


            if(jump_frame === 29){
                jump_frame = 0
            }
            else{
                jump_frame++
            }
        },
        newPosition: function(){
            if (this.y === 190){
                this.speedY = 2;
            }
            this.y = this.y + this.speedY
            if (this.y === 330){
                this.speedY = 0
            }
        },
        collide:function(obs){
            return this.x + this.width > obs.x + 35 && this.x < obs.x + obs.width - 35 && this.y + this.height > obs.y +10
        }

    }

    //obstacle class
    class Obstacle{
        constructor(){
            this.height = 60;
            this.width = 60;
            this.x = runnerGame.canvas.width - this.width;
            this.y = runnerGame.canvas.height - this.height;
            this.i = Math.floor(Math.random() * (obstacleSprites.length));
        }

        create(){
           let image = new Image()
           image.src = obstacleSprites[this.i]

           setTimeout(runnerGame.context.drawImage(image, this.x, this.y, this.width, this.height ),5)
        }
    }


    //invoke to start the game

    // button.addEventListener('click', function(event){
 
    //     if(event.target.id === 'button'){

    //       runnerGame.gameOver = false
    //       you_lost.remove()
    //       runnerGame.clear()
    //       runnerGame.start()
    //     }

    // })

    document.addEventListener('submit', (event) => {
        event.preventDefault()

        const userName  = event.target.userName.value
        const score = Math.floor(runnerGame.score)

        if (event.target.userName.value === ''){
            window.alert("Please add a nickname")
        }
        else{
            fetch(usersApi, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                method:'POST',
                body: JSON.stringify({user_name: userName, score: score})
            })
            you_lost.remove()
            location.reload()
        }

    })

    document.addEventListener('click', (event) => {
        let modal = document.body.querySelector('#myModal')
        const span = document.body.querySelector('span')

        if(event.target === leaderBoard){
            runnerGame.stop()

            fetch(usersApi)
            .then(r => r.json())
            .then((userData) => {

                let sortedUser = []

                let modal = document.body.querySelector('#myModal')

                let table = document.body.querySelector('table')


                for(let user of userData){
                    sortedUser.push(user)
                }

               sortedUser = sortedUser.sort((userA, userB) => userB.score - userA.score).slice(0,10)
               table.innerHTML = ''
               table.innerHTML += `<tr>
                                        <th class="heading">username</th>
                                        <th class="heading">score</th> 
                                    </tr>`
               for(let i = 0; i < sortedUser.length; i++){
                    if (i === 0 ||  i === 1  || i === 2){
                        table.innerHTML+= `<tr>
                        <th class='num_1'>${sortedUser[i].user_name}</th>
                        <th class='num_1'>${sortedUser[i].score}</th>
                        </tr>`
                    }
                    else{
                        table.innerHTML+= `<tr>
                        <th>${sortedUser[i].user_name}</th>
                        <th>${sortedUser[i].score}</th>
                        </tr>`
                    }


               }

               modal.style.display = "block";
            })

        }

        if(event.target === span){
            modal.style.display = "none"
            runnerGame.start()
        }
    })

    document.querySelector('#button').addEventListener('click', (event) => {
        document.querySelector('canvas').style.display = 'block'
        document.querySelector('#button').style.display = 'none'
        
        runnerGame.start()
    })
    runnerGame.stop()
   



})