var canvas, ctx, gameControl, gameActive;
      // render X times per second
      var x = 8;
      
      const CANVAS_BORDER_COLOUR = 'black';
      const CANVAS_BACKGROUND_COLOUR = "white";
      const SNAKE_COLOUR = 'lightgreen';
      const SNAKE_BORDER_COLOUR = 'darkgreen';


      window.onload = function() {
        canvas = document.getElementById("snake");
        ctx = canvas.getContext("2d");
	
        document.addEventListener("keydown", keyDownEvent);

        gameControl = startGame(x);
      };
      
      /* função para iniciar o jogo */
      function startGame(x) {
          // definindo o sinalizador gameActive como true
          gameActive = true;
          document.getElementById("game-score").innerHTML = "";
          return setInterval(draw, 1000 / x);
      }
      
      function pauseGame() {
          // definindo o sinalizador gameActive como false
          clearInterval(gameControl);
          gameActive = false;
          document.getElementById("game-status").innerHTML = "<small>Jogo Pausado</small>";
      }
      
      function endGame(x) {
          // definindo o sinalizador gameActive como false
          clearInterval(gameControl);
          gameActive = false;
          document.getElementById("game-score").innerHTML = "<h1>Pontuação: " + x + "</h1>";
		  var end = document.getElementById('end');
		  end.innerHTML = `<br> Fim de Jogo`;
		  end.style.display = "block";
		  dead.play();
		  reload();
      }
	  // recarregar página
	  
		function reload()
		{
			setTimeout(() => {
				window.location.reload();
			}, 5000)
		}

     // mundo dos jogos
      var gridSize = (tileSize = 23); // 20 x 20 = 400
      var nextX = (nextY = 0);

      // snake
      var defaultTailSize = 3;
      var tailSize = defaultTailSize;
      var snakeTrail = [];
      var snakeX = (snakeY = 10);

      // Maça
	  var appleX = (appleY = 15)
	  
	  // carrega arquivos de áudio
	  var dead = new Audio();
	  var eat = new Audio();
	  dead.src = "audio/dead.mp3";
	  eat.src = "audio/eat.mp3";
	  
	  
      // draw
      function draw() {
        // mova a cobra na próxima posição
        snakeX += nextX;
        snakeY += nextY;

        // cobra sobre o mundo do jogo?
        if (snakeX < 0) {
          snakeX = gridSize - 1;
        }
        if (snakeX > gridSize - 1) {
          snakeX = 0;
        }

        if (snakeY < 0) {
          snakeY = gridSize - 1;
        }
        if (snakeY > gridSize - 1) {
          snakeY = 0;
        }

        //Maçã cominda de cobra?
        if (snakeX == appleX && snakeY == appleY) {
          tailSize++;
			eat.play();
          appleX = Math.floor(Math.random() * gridSize);
          appleY = Math.floor(Math.random() * gridSize);
		  
		}
		
		
        //  Select the colour to fill the canvas
      ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
      //  Select the colour for the border of the canvas
      ctx.strokestyle = CANVAS_BORDER_COLOUR;

      // Draw a "filled" rectangle to cover the entire canvas
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Draw a "border" around the entire canvas
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // paint snake
        ctx.fillStyle = SNAKE_COLOUR;
        ctx.strokestyle = SNAKE_BORDER_COLOUR;
        for (var i = 0; i < snakeTrail.length; i++) {
          ctx.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
          );
          
          ctx.strokeRect(snakeTrail[i].x * tileSize , snakeTrail[i].y* tileSize, tileSize, tileSize);

          //snake bites it's tail?
          if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
            if(tailSize > 3) {
                endGame(tailSize);
            }
            tailSize = defaultTailSize;  
          }
        }

        // paint apple
        ctx.fillStyle = "red";
		ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);
		ctx.fill();
		
        //set snake trail
        snakeTrail.push({ x: snakeX, y: snakeY });
        while (snakeTrail.length > tailSize) {
          snakeTrail.shift();
        }
      }

      // input
      function keyDownEvent(e) {
        switch (e.keyCode) {
          case 37:
            nextX = -1;
            nextY = 0;
            break;
          case 38:
            nextX = 0;
            nextY = -1;
            break;
          case 39:
            nextX = 1;
            nextY = 0;
            break;
          case 40:
            nextX = 0;
            nextY = 1;
            break;
          case 32:
            if(gameActive == true) {
                pauseGame();
            }
            else {
                gameControl = startGame(x);
            }
            break;
        }
      }