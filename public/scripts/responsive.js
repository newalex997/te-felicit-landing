var breakpoints = (function () {
  function e(e) {
    t.init(e);
  }
  var t = {
    list: null,
    media: {},
    events: [],
    init: function (e) {
      (t.list = e),
        window.addEventListener("resize", t.poll),
        window.addEventListener("orientationchange", t.poll),
        window.addEventListener("load", t.poll),
        window.addEventListener("fullscreenchange", t.poll);
    },
    active: function (e) {
      var n, a, s, i, r, d, c;
      if (!(e in t.media)) {
        if (
          (">=" == e.substr(0, 2)
            ? ((a = "gte"), (n = e.substr(2)))
            : "<=" == e.substr(0, 2)
            ? ((a = "lte"), (n = e.substr(2)))
            : ">" == e.substr(0, 1)
            ? ((a = "gt"), (n = e.substr(1)))
            : "<" == e.substr(0, 1)
            ? ((a = "lt"), (n = e.substr(1)))
            : "!" == e.substr(0, 1)
            ? ((a = "not"), (n = e.substr(1)))
            : ((a = "eq"), (n = e)),
          n && n in t.list)
        )
          if (((i = t.list[n]), Array.isArray(i))) {
            if (((r = parseInt(i[0])), (d = parseInt(i[1])), isNaN(r))) {
              if (isNaN(d)) return;
              c = i[1].substr(String(d).length);
            } else c = i[0].substr(String(r).length);
            if (isNaN(r))
              switch (a) {
                case "gte":
                  s = "screen";
                  break;
                case "lte":
                  s = "screen and (max-width: " + d + c + ")";
                  break;
                case "gt":
                  s = "screen and (min-width: " + (d + 1) + c + ")";
                  break;
                case "lt":
                  s = "screen and (max-width: -1px)";
                  break;
                case "not":
                  s = "screen and (min-width: " + (d + 1) + c + ")";
                  break;
                default:
                  s = "screen and (max-width: " + d + c + ")";
              }
            else if (isNaN(d))
              switch (a) {
                case "gte":
                  s = "screen and (min-width: " + r + c + ")";
                  break;
                case "lte":
                  s = "screen";
                  break;
                case "gt":
                  s = "screen and (max-width: -1px)";
                  break;
                case "lt":
                  s = "screen and (max-width: " + (r - 1) + c + ")";
                  break;
                case "not":
                  s = "screen and (max-width: " + (r - 1) + c + ")";
                  break;
                default:
                  s = "screen and (min-width: " + r + c + ")";
              }
            else
              switch (a) {
                case "gte":
                  s = "screen and (min-width: " + r + c + ")";
                  break;
                case "lte":
                  s = "screen and (max-width: " + d + c + ")";
                  break;
                case "gt":
                  s = "screen and (min-width: " + (d + 1) + c + ")";
                  break;
                case "lt":
                  s = "screen and (max-width: " + (r - 1) + c + ")";
                  break;
                case "not":
                  s =
                    "screen and (max-width: " +
                    (r - 1) +
                    c +
                    "), screen and (min-width: " +
                    (d + 1) +
                    c +
                    ")";
                  break;
                default:
                  s =
                    "screen and (min-width: " +
                    r +
                    c +
                    ") and (max-width: " +
                    d +
                    c +
                    ")";
              }
          } else s = "(" == i.charAt(0) ? "screen and " + i : i;
        t.media[e] = !!s && s;
      }
      return t.media[e] !== !1 && window.matchMedia(t.media[e]).matches;
    },
    on: function (e, n) {
      t.events.push({ query: e, handler: n, state: !1 }), t.active(e) && n();
    },
    poll: function () {
      var e, n;
      for (e = 0; e < t.events.length; e++)
        (n = t.events[e]),
          t.active(n.query)
            ? n.state || ((n.state = !0), n.handler())
            : n.state && (n.state = !1);
    },
  };
  return (
    (e._ = t),
    (e.on = function (e, n) {
      t.on(e, n);
    }),
    (e.active = function (e) {
      return t.active(e);
    }),
    e
  );
})();

!(function (e, t) {
  "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (module.exports = t())
    : (e.breakpoints = t());
})(this, function () {
  return breakpoints;
});

window.onload = function () {
  var $body = document.body;
  var $sidebar = document.getElementById("sidebar");

  setTimeout(function () {
    $body.classList.remove("is-preload");
  }, 100);

  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: [null, "480px"],
  });

  // Hack: Enable IE flexbox workarounds.
  if (navigator.userAgent.indexOf("MSIE") !== -1 || !!document.documentMode) {
    $body.classList.add("is-ie");
  }

  // Sidebar.
  if ($sidebar) {
    var $sidebar_a = $sidebar.querySelectorAll("a");

    $sidebar_a.forEach(function (link) {
      link.classList.add("scrolly");

      link.addEventListener("click", function (event) {
        if (link.getAttribute("href").charAt(0) !== "#") return;

        $sidebar_a.forEach(function (link) {
          link.classList.remove("active");
        });

        link.classList.add("active", "active-locked");
      });

      var id = link.getAttribute("href");
      var $section = document.querySelector(id);

      if (!$section) return;

      // Scrollex placeholder (assuming a scrollex-like behavior).
      var scrollex = function (config) {
        // Placeholder for scrollex function.
        var onScroll = function () {
          var rect = $section.getBoundingClientRect();
          if (
            rect.top < window.innerHeight * 0.8 &&
            rect.bottom > window.innerHeight * 0.2
          ) {
            config.enter();
          } else {
            config.initialize();
          }
        };

        window.addEventListener("scroll", onScroll);
        window.addEventListener("load", onScroll);
        onScroll(); // Initial check
      };

      scrollex({
        mode: "middle",
        top: "-20vh",
        bottom: "-20vh",
        initialize: function () {
          $section.classList.add("inactive");
        },
        enter: function () {
          $section.classList.remove("inactive");
          if (!$sidebar.querySelector(".active-locked")) {
            $sidebar_a.forEach(function (link) {
              link.classList.remove("active");
            });
            link.classList.add("active");
          } else if (link.classList.contains("active-locked")) {
            link.classList.remove("active-locked");
          }
        },
      });
    });
  }

  // Scrolly.
  document.querySelectorAll(".scrolly").forEach(function (element) {
    // Placeholder for scrolly function.
    var scrolly = function (config) {
      element.addEventListener("click", function (event) {
        event.preventDefault();
        var targetId = element.getAttribute("href");
        var target = document.querySelector(targetId);
        if (target) {
          var offset = config.offset();
          window.scrollTo({
            top: target.offsetTop - offset,
            behavior: "smooth",
          });
        }
      });
    };

    scrolly({
      speed: 1000,
      offset: function () {
        if (
          breakpoints.active("<=large") &&
          !breakpoints.active("<=small") &&
          $sidebar
        ) {
          return $sidebar.offsetHeight;
        }
        return 0;
      },
    });
  });

  // Spotlights.
  document
    .querySelectorAll(".spotlights > section")
    .forEach(function (section) {
      var scrollex = function (config) {
        // Placeholder for scrollex function.
        var onScroll = function () {
          var rect = section.getBoundingClientRect();
          if (
            rect.top < window.innerHeight * 0.9 &&
            rect.bottom > window.innerHeight * 0.1
          ) {
            config.enter();
          } else {
            config.initialize();
          }
        };

        window.addEventListener("scroll", onScroll);
        window.addEventListener("load", onScroll);
        onScroll(); // Initial check
      };

      scrollex({
        mode: "middle",
        top: "-10vh",
        bottom: "-10vh",
        initialize: function () {
          section.classList.add("inactive");
        },
        enter: function () {
          section.classList.remove("inactive");
        },
      });

      var $image = section.querySelector(".image");
      if (!$image) return;
      var $img = $image.querySelector("img");
      if (!$img) return;

      $image.style.backgroundImage = "url(" + $img.getAttribute("src") + ")";
      var position = $img.dataset.position;
      if (position) {
        $image.style.backgroundPosition = position;
      }

      $img.style.display = "none";
    });

  // Features.
  document.querySelectorAll(".features").forEach(function (feature) {
    var scrollex = function (config) {
      // Placeholder for scrollex function.
      var onScroll = function () {
        var rect = feature.getBoundingClientRect();
        if (
          rect.top < window.innerHeight * 0.8 &&
          rect.bottom > window.innerHeight * 0.2
        ) {
          config.enter();
        } else {
          config.initialize();
        }
      };

      window.addEventListener("scroll", onScroll);
      window.addEventListener("load", onScroll);
      onScroll(); // Initial check
    };

    scrollex({
      mode: "middle",
      top: "-20vh",
      bottom: "-20vh",
      initialize: function () {
        feature.classList.add("inactive");
      },
      enter: function () {
        feature.classList.remove("inactive");
      },
    });
  });
};
