function handleReady() {
  // Start split animation on body or container
  document.body.classList.add('split-animation');

  setTimeout(() => {
    document.body.classList.add('active');
  }, 10);


  // Wait for animation to finish (e.g. 1s), then redirect
  setTimeout(() => {
    window.location.href = '/protected/kq1';
  }, 1000); // match your CSS animation duration

 /* // After animation, activate reveal section
  setTimeout(() => {
    document.body.classList.add('active');
    document.getElementById('reveal-section').classList.remove('d-none');
  }, 1000); // Match animation duration*/
}




/*function handleReady() {
  // Create split panels
  const leftPanel = document.createElement("div");
  const rightPanel = document.createElement("div");

  leftPanel.className = "split left-split";
  rightPanel.className = "split right-split";

  document.body.appendChild(leftPanel);
  document.body.appendChild(rightPanel);

  // Animate
  setTimeout(() => {
    leftPanel.classList.add("animate-left");
    rightPanel.classList.add("animate-right");
  }, 50);

  // After animation, redirect to new page
  setTimeout(() => {
    window.location.href = "kq2.html";
  }, 1100);
} */