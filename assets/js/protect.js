(function () {
  // SHA-256 hash of the access password. Change PASSWORD_HASH to update it
  // (generate with: python3 -c "import hashlib;print(hashlib.sha256(b'yourpassword').hexdigest())")
  var PASSWORD_HASH = "e37d74ea88b3f4e075983169d935300b3066e0864b0a7e233b94b2b29ba30000";
  var SESSION_KEY = "jx_portfolio_unlocked";

  async function sha256Hex(text) {
    var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(function (b) {
      return b.toString(16).padStart(2, "0");
    }).join("");
  }

  function unlock() {
    document.documentElement.classList.add("jx-unlocked");
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (e) {}
  }

  // Already unlocked earlier this session
  if (sessionStorage.getItem(SESSION_KEY) === "1") {
    unlock();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("pw-gate-form");
    var input = document.getElementById("pw-gate-input");
    var error = document.getElementById("pw-gate-error");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var hash = await sha256Hex(input.value);
      if (hash === PASSWORD_HASH) {
        error.textContent = "";
        unlock();
      } else {
        error.textContent = "That password isn't right — try again.";
        input.value = "";
        input.focus();
      }
    });
  });
})();
