const canvas = document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

const mouse = {
	x:canvas.width/2,
	y:canvas.height/2
}
window.addEventListener('mousemove',event=>{
	mouse.x = event.clientX
	mouse.y = event.clientY
})
window.addEventListener('resize',event=>{
	canvas.width = event.target.innerWidth
	canvas.height = event.target.innerHeight
})
function Ball( x, y, r, dx, dy, color){
	this.x = x
	this.y = y
	this.r = r
	this.dx = dx
	this.dy = dy
	this.color = color
	this.initR = r
}

Ball.prototype.draw = function(){
	ctx.beginPath()
	ctx.arc(this.x,this.y,this.r,0,2*Math.PI)
	ctx.fillStyle = this.color
	ctx.fill()
	ctx.closePath()
}

Ball.prototype.update = function(){
	if(this.x + this.r >= canvas.width || this.x -  this.r <= 0){
		this.dx = -this.dx
	}
	if(this.y + this.r >= canvas.height || this.y -  this.r <= 0){
		this.dy = -this.dy
	}
	if(this.x > mouse.x - 50 
	&& this.x < mouse.x + 50
	&& this.y > mouse.y - 50
	&& this.y < mouse.y + 50
	&& this.r <= this.initR + 20
	){
		this.r += 1
	}else if(this.r > this.initR){
		this.r -= 1
	}
	this.x += this.dx
	this.y += this.dy
	this.draw()
}

let ballArray = []
for(let i = 0 ; i < 400 ; i++){
	let r = Math.random()*4+1
	let x = Math.random()*canvas.width
	let y = Math.random()*canvas.height
	let dx = (Math.random()-0.5)*2
	let dy = (Math.random()-0.5)*2
	let color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
	ballArray.push(new Ball(x, y, r, dx, dy, color))
}

function animation(){
	requestAnimationFrame(animation,canvas)
	ctx.clearRect(0,0,canvas.width,canvas.height)
	for(let ball of ballArray){
		ball.update()
	}
}
animation()