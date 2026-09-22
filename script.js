(function(){
"use strict";

var W = 360, H = 240;

// ---------------------------------------------------------------
// Nine original p5.js sketches, each a self-contained instance-mode
// function. The exact source shown under each heading is this same
// function's toString() -- what you read is what runs.
// ---------------------------------------------------------------

var SKETCHES = [

  {
    id: 'glow-trail',
    editorId: 'H41Fo9U63',
    title: 'Glow Trail',
    hint: 'move the mouse · click to clear',
    fn: function(p){
      p.setup = function(){
        p.createCanvas(W, H);
        p.background(255);
        p.noStroke();
      };
      p.draw = function(){
        p.fill(255, 255, 255, 18);
        p.rect(0, 0, W, H);
        var r = 46 + Math.sin(p.frameCount * 0.06) * 18;
        p.fill(226, 69, 44, 70);
        p.circle(p.mouseX, p.mouseY, r);
        p.fill(31, 111, 178, 45);
        p.circle(p.mouseX, p.mouseY, r * 1.7);
      };
      p.mousePressed = function(){
        if (p.mouseX < 0 || p.mouseX > W || p.mouseY < 0 || p.mouseY > H) return;
        p.background(255);
      };
    }
  },

  {
    id: 'hue-field',
    editorId: 'G37QD-c3I',
    title: 'Hue Field',
    hint: 'drag across the canvas · click to reset',
    fn: function(p){
      p.setup = function(){
        p.createCanvas(W, H);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(0, 0, 98);
        p.noStroke();
      };
      p.draw = function(){
        if (p.mouseIsPressed || p.frameCount % 2 === 0) {
          var hue = p.map(p.mouseX, 0, W, 0, 360);
          var sat = p.map(p.mouseY, 0, H, 30, 90);
          p.fill(hue, sat, 90, 55);
          p.rectMode(p.CENTER);
          p.square(p.mouseX, p.mouseY, 14);
        }
      };
      p.mousePressed = function(){
        if (p.mouseX < 0 || p.mouseX > W || p.mouseY < 0 || p.mouseY > H) return;
        p.background(0, 0, 98);
      };
    }
  },

  {
    id: 'tether',
    editorId: 'vU_WcRXKA',
    title: 'Tether',
    hint: 'move the mouse · click to add an anchor',
    fn: function(p){
      var anchors = [];
      p.setup = function(){
        p.createCanvas(W, H);
      };
      p.draw = function(){
        p.background(247, 246, 242);
        var cx = W / 2, cy = H / 2;
        drawLine(cx, cy);
        anchors.forEach(function(a){ drawLine(a.x, a.y); });
        function drawLine(x, y){
          var d = p.dist(x, y, p.mouseX, p.mouseY);
          var w = p.map(d, 0, 300, 6, 0.6, true);
          var t = p.map(d, 0, 300, 0, 1, true);
          var c = p.lerpColor(p.color(226, 69, 44), p.color(31, 111, 178), t);
          p.stroke(c);
          p.strokeWeight(w);
          p.line(x, y, p.mouseX, p.mouseY);
          p.noStroke();
          p.fill(c);
          p.circle(x, y, 8);
        }
      };
      p.mousePressed = function(){
        if (p.mouseX < 0 || p.mouseX > W || p.mouseY < 0 || p.mouseY > H) return;
        anchors.push({ x: p.mouseX, y: p.mouseY });
        if (anchors.length > 4) anchors.shift();
      };
    }
  },

  {
    id: 'kite-drift',
    editorId: 'wK6imcof3',
    title: 'Kite Drift',
    hint: 'move the mouse',
    fn: function(p){
      var pos, vel;
      p.setup = function(){
        p.createCanvas(W, H);
        p.background(255);
        pos = p.createVector(W / 2, H / 2);
        vel = p.createVector(0, 0);
      };
      p.draw = function(){
        p.fill(255, 255, 255, 30);
        p.noStroke();
        p.rect(0, 0, W, H);

        var target = p.createVector(p.mouseX, p.mouseY);
        var prev = pos.copy();
        pos.x += (target.x - pos.x) * 0.09;
        pos.y += (target.y - pos.y) * 0.09;
        vel = p5.Vector.sub(pos, prev);
        var heading = vel.mag() > 0.05 ? vel.heading() : 0;

        p.push();
        p.translate(pos.x, pos.y);
        p.rotate(heading);
        p.noStroke();
        p.fill(226, 69, 44, 200);
        p.beginShape();
        p.vertex(16, 0);
        p.vertex(0, 7);
        p.vertex(-14, 0);
        p.vertex(0, -7);
        p.endShape(p.CLOSE);
        p.pop();
      };
    }
  },

  {
    id: 'bloom-rings',
    editorId: 'qjqeSxA_B',
    title: 'Bloom Rings',
    hint: 'click to spawn a ring',
    fn: function(p){
      var rings = [];
      p.setup = function(){ p.createCanvas(W, H); p.noFill(); };
      p.draw = function(){
        p.background(255);
        for (var i = rings.length - 1; i >= 0; i--){
          var r = rings[i];
          p.stroke(226, 69, 44, r.a);
          p.strokeWeight(2);
          p.circle(r.x, r.y, r.d);
          r.d += 3.2;
          r.a -= 3.5;
          if (r.a <= 0) rings.splice(i, 1);
        }
      };
      p.mousePressed = function(){
        if (p.mouseX < 0 || p.mouseX > W || p.mouseY < 0 || p.mouseY > H) return;
        rings.push({ x: p.mouseX, y: p.mouseY, d: 4, a: 200 });
      };
    }
  },

  {
    id: 'orbit',
    editorId: 'Y9qoOX4dA',
    title: 'Orbit',
    hint: 'move the mouse',
    fn: function(p){
      var angle = 0;
      p.setup = function(){
        p.createCanvas(W, H);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(0, 0, 98);
        p.noStroke();
      };
      p.draw = function(){
        p.fill(0, 0, 98, 10);
        p.rect(0, 0, W, H);
        angle += 0.09;
        var radius = 30 + Math.sin(p.frameCount * 0.02) * 20;
        var ox = p.mouseX + Math.cos(angle) * radius;
        var oy = p.mouseY + Math.sin(angle) * radius * 0.6;
        p.fill((p.frameCount * 2) % 360, 80, 90);
        p.circle(ox, oy, 12);
      };
    }
  },

  {
    id: 'gravity-bounce',
    editorId: 'dzYaNhTvN',
    title: 'Gravity Bounce',
    hint: 'click to launch the balls',
    fn: function(p){
      var balls = [];
      p.setup = function(){
        p.createCanvas(W, H);
        for (var i = 0; i < 6; i++){
          balls.push({
            x: 30 + i * 50, y: 20 + i * 12, r: 12,
            vx: p.random(-2, 2), vy: 0,
            hue: p.map(i, 0, 6, 0, 360)
          });
        }
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };
      p.draw = function(){
        p.background(0, 0, 100);
        balls.forEach(function(b){
          b.vy += 0.45;
          b.x += b.vx;
          b.y += b.vy;
          if (b.y > H - b.r){ b.y = H - b.r; b.vy *= -0.72; }
          if (b.x < b.r || b.x > W - b.r){ b.vx *= -1; }
          p.noStroke();
          p.fill(b.hue, 70, 90);
          p.circle(b.x, b.y, b.r * 2);
        });
      };
      p.mousePressed = function(){
        if (p.mouseX < 0 || p.mouseX > W || p.mouseY < 0 || p.mouseY > H) return;
        balls.forEach(function(b){ b.vy -= 6 + p.random(2); });
      };
    }
  },

  {
    id: 'spin-prism',
    editorId: 'V8owoFAWu',
    title: 'Spin Prism',
    hint: 'renders in 3D · click to change shape',
    fn: function(p){
      var shape = 0;
      p.setup = function(){
        p.createCanvas(W, H, p.WEBGL);
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };
      p.draw = function(){
        p.background(0, 0, 97);
        p.ambientLight(160);
        p.pointLight(255, 255, 255, 80, -80, 160);
        p.rotateX(p.frameCount * 0.012);
        p.rotateY(p.frameCount * 0.017);
        p.noStroke();
        p.fill((p.frameCount * 1.4) % 360, 65, 90);
        if (shape === 0) p.torus(58, 20, 28, 14);
        else if (shape === 1) p.box(80);
        else p.cone(55, 90, 24, 1);
      };
      p.mousePressed = function(){
        if (p.mouseX < 0 || p.mouseX > W || p.mouseY < 0 || p.mouseY > H) return;
        shape = (shape + 1) % 3;
      };
    }
  },

  {
    id: 'converge',
    editorId: 'X3PH_RBVe',
    title: 'Converge',
    hint: 'move the mouse · click for a burst',
    fn: function(p){
      var pts = [];
      function spawn(){
        var edge = Math.floor(p.random(4));
        var x = edge === 0 ? 0 : edge === 1 ? W : p.random(W);
        var y = edge === 2 ? 0 : edge === 3 ? H : p.random(H);
        return { x: x, y: y, hue: p.random(360) };
      }
      p.setup = function(){
        p.createCanvas(W, H);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(0, 0, 8);
        for (var i = 0; i < 40; i++) pts.push(spawn());
      };
      p.draw = function(){
        p.fill(0, 0, 8, 22);
        p.noStroke();
        p.rect(0, 0, W, H);
        pts.forEach(function(pt, i){
          pt.x += (p.mouseX - pt.x) * 0.02;
          pt.y += (p.mouseY - pt.y) * 0.02;
          p.fill(pt.hue, 70, 95, 80);
          p.circle(pt.x, pt.y, 4);
          if (p.dist(pt.x, pt.y, p.mouseX, p.mouseY) < 10) pts[i] = spawn();
        });
      };
      p.mousePressed = function(){
        if (p.mouseX < 0 || p.mouseX > W || p.mouseY < 0 || p.mouseY > H) return;
        for (var i = 0; i < 10; i++) pts.push(spawn());
        if (pts.length > 80) pts.splice(0, pts.length - 80);
      };
    }
  }

];

// ---------------------------------------------------------------

function prettySource(fn){
  var src = fn.toString();
  // de-indent consistently and drop the outermost instance-mode wrapper
  // line so what's left reads like an ordinary p5 sketch body.
  return src;
}

function render(){
  var grid = document.getElementById('grid');
  var html = SKETCHES.map(function(s){
    return (
      '<div class="sketch" data-id="' + s.id + '">' +
        '<div class="sk-head"><span class="dot"></span>' + s.title + '<span class="hint">&mdash; ' + s.hint + '</span></div>' +
        '<div class="sk-canvas" id="canvas-' + s.id + '"></div>' +
        '<pre class="sk-code"><code></code></pre>' +
        '<a class="sk-editor-link" href="https://editor.p5js.org/SKoley89/sketches/' + s.editorId + '" target="_blank" rel="noopener">Open in p5.js editor &#8599;</a>' +
      '</div>'
    );
  }).join('');
  grid.innerHTML = html;

  SKETCHES.forEach(function(s){
    var card = grid.querySelector('.sketch[data-id="' + s.id + '"]');
    card.querySelector('.sk-code code').textContent = prettySource(s.fn);
  });

  var firstHolder = grid.querySelector('.sk-canvas');
  var measuredW = firstHolder ? Math.round(firstHolder.getBoundingClientRect().width) : 0;
  if (measuredW > 0) {
    W = measuredW;
    H = Math.round(W * 2 / 3);
  }

  SKETCHES.forEach(function(s){
    var card = grid.querySelector('.sketch[data-id="' + s.id + '"]');
    var holder = card.querySelector('.sk-canvas');
    try {
      new p5(s.fn, holder);
    } catch (err) {
      console.error('sketch failed to start:', s.id, err);
    }
  });
}

render();

var themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', function(){
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    try { localStorage.setItem('sketchbook-theme', isLight ? 'dark' : 'light'); } catch (e) {}
  });
}

})();
