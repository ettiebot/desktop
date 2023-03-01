/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(
        exports,
        require("@tensorflow/tfjs-core"),
        require("util"),
        require("@tensorflow/tfjs-data"),
        require("@tensorflow/tfjs-layers")
      )
    : "function" == typeof define && define.amd
    ? define(
        [
          "exports",
          "@tensorflow/tfjs-core",
          "util",
          "@tensorflow/tfjs-data",
          "@tensorflow/tfjs-layers",
        ],
        t
      )
    : t((e.speechCommands = {}), e.tf, null, e.tf.data, e.tf);
})(this, function (e, t, r, n, a) {
  "use strict";
  var i = function (e, t) {
    return (i =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (e, t) {
          e.__proto__ = t;
        }) ||
      function (e, t) {
        for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
      })(e, t);
  };
  var s = function () {
    return (s =
      Object.assign ||
      function (e) {
        for (var t, r = 1, n = arguments.length; r < n; r++)
          for (var a in (t = arguments[r]))
            Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
        return e;
      }).apply(this, arguments);
  };
  function o(e, t, r, n) {
    return new (r || (r = Promise))(function (a, i) {
      function s(e) {
        try {
          l(n.next(e));
        } catch (e) {
          i(e);
        }
      }
      function o(e) {
        try {
          l(n.throw(e));
        } catch (e) {
          i(e);
        }
      }
      function l(e) {
        var t;
        e.done
          ? a(e.value)
          : ((t = e.value),
            t instanceof r
              ? t
              : new r(function (e) {
                  e(t);
                })).then(s, o);
      }
      l((n = n.apply(e, t || [])).next());
    });
  }
  function l(e, t) {
    var r,
      n,
      a,
      i,
      s = {
        label: 0,
        sent: function () {
          if (1 & a[0]) throw a[1];
          return a[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: o(0), throw: o(1), return: o(2) }),
      "function" == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function o(i) {
      return function (o) {
        return (function (i) {
          if (r) throw new TypeError("Generator is already executing.");
          for (; s; )
            try {
              if (
                ((r = 1),
                n &&
                  (a =
                    2 & i[0]
                      ? n.return
                      : i[0]
                      ? n.throw || ((a = n.return) && a.call(n), 0)
                      : n.next) &&
                  !(a = a.call(n, i[1])).done)
              )
                return a;
              switch (((n = 0), a && (i = [2 & i[0], a.value]), i[0])) {
                case 0:
                case 1:
                  a = i;
                  break;
                case 4:
                  return s.label++, { value: i[1], done: !1 };
                case 5:
                  s.label++, (n = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = s.ops.pop()), s.trys.pop();
                  continue;
                default:
                  if (
                    !(a = (a = s.trys).length > 0 && a[a.length - 1]) &&
                    (6 === i[0] || 2 === i[0])
                  ) {
                    s = 0;
                    continue;
                  }
                  if (3 === i[0] && (!a || (i[1] > a[0] && i[1] < a[3]))) {
                    s.label = i[1];
                    break;
                  }
                  if (6 === i[0] && s.label < a[1]) {
                    (s.label = a[1]), (a = i);
                    break;
                  }
                  if (a && s.label < a[2]) {
                    (s.label = a[2]), s.ops.push(i);
                    break;
                  }
                  a[2] && s.ops.pop(), s.trys.pop();
                  continue;
              }
              i = t.call(e, s);
            } catch (e) {
              (i = [6, e]), (n = 0);
            } finally {
              r = a = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, o]);
      };
    }
  }
  function u(e) {
    var t = "function" == typeof Symbol && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && "number" == typeof e.length)
      return {
        next: function () {
          return (
            e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e }
          );
        },
      };
    throw new TypeError(
      t ? "Object is not iterable." : "Symbol.iterator is not defined."
    );
  }
  function c(e, t) {
    var r = "function" == typeof Symbol && e[Symbol.iterator];
    if (!r) return e;
    var n,
      a,
      i = r.call(e),
      s = [];
    try {
      for (; (void 0 === t || t-- > 0) && !(n = i.next()).done; )
        s.push(n.value);
    } catch (e) {
      a = { error: e };
    } finally {
      try {
        n && !n.done && (r = i.return) && r.call(i);
      } finally {
        if (a) throw a.error;
      }
    }
    return s;
  }
  function h() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e = e.concat(c(arguments[t]));
    return e;
  }
  var d = null;
  function p(e) {
    return (
      null == d && (d = t.backend().epsilon()),
      t.tidy(function () {
        var r = t.moments(e),
          n = r.mean,
          a = r.variance;
        return t.div(t.sub(e, n), t.add(t.sqrt(a), d));
      })
    );
  }
  function f(e) {
    if (e.length < 2)
      throw new Error(
        "Cannot normalize a Float32Array with fewer than 2 elements."
      );
    return (
      null == d && (d = t.backend().epsilon()),
      t.tidy(function () {
        var r = t.moments(t.tensor1d(e)),
          n = r.mean,
          a = r.variance,
          i = n.arraySync(),
          s = Math.sqrt(a.arraySync()),
          o = Array.from(e).map(function (e) {
            return (e - i) / (s + d);
          });
        return new Float32Array(o);
      })
    );
  }
  var m = (function () {
    function e(e) {
      var r = this;
      if (null == e)
        throw new Error(
          "Required configuration object is missing for BrowserFftFeatureExtractor constructor"
        );
      if (null == e.spectrogramCallback)
        throw new Error("spectrogramCallback cannot be null or undefined");
      if (!(e.numFramesPerSpectrogram > 0))
        throw new Error(
          "Invalid value in numFramesPerSpectrogram: " +
            e.numFramesPerSpectrogram
        );
      if (e.suppressionTimeMillis < 0)
        throw new Error(
          "Expected suppressionTimeMillis to be >= 0, but got " +
            e.suppressionTimeMillis
        );
      if (
        ((this.suppressionTimeMillis = e.suppressionTimeMillis),
        (this.spectrogramCallback = e.spectrogramCallback),
        (this.numFrames = e.numFramesPerSpectrogram),
        (this.sampleRateHz = e.sampleRateHz || 44100),
        (this.fftSize = e.fftSize || 1024),
        (this.frameDurationMillis = (this.fftSize / this.sampleRateHz) * 1e3),
        (this.columnTruncateLength = e.columnTruncateLength || this.fftSize),
        (this.overlapFactor = e.overlapFactor),
        (this.includeRawAudio = e.includeRawAudio),
        t.util.assert(
          this.overlapFactor >= 0 && this.overlapFactor < 1,
          function () {
            return (
              "Expected overlapFactor to be >= 0 and < 1, but got " +
              r.overlapFactor
            );
          }
        ),
        this.columnTruncateLength > this.fftSize)
      )
        throw new Error(
          "columnTruncateLength " +
            this.columnTruncateLength +
            " exceeds fftSize (" +
            this.fftSize +
            ")."
        );
      this.audioContextConstructor =
        window.AudioContext || window.webkitAudioContext;
    }
    return (
      (e.prototype.start = function (e) {
        return o(this, void 0, void 0, function () {
          var t, r, n;
          return l(this, function (a) {
            switch (a.label) {
              case 0:
                if (null != this.frameIntervalTask)
                  throw new Error(
                    "Cannot start already-started BrowserFftFeatureExtractor"
                  );
                return (
                  (t = this),
                  [
                    4,
                    (function (e) {
                      return o(this, void 0, void 0, function () {
                        return l(this, function (t) {
                          return [
                            2,
                            navigator.mediaDevices.getUserMedia({
                              audio: localStorage.getItem("et.micDevice")
                                ? {
                                    deviceId: {
                                      exact:
                                        localStorage.getItem("et.micDevice"),
                                    },
                                    echoCancellation: true,
                                  }
                                : true,
                              video: !1,
                            }),
                          ];
                        });
                      });
                    })(e),
                  ]
                );
              case 1:
                return (
                  (t.stream = a.sent()),
                  (this.audioContext = new this.audioContextConstructor({
                    sampleRate: this.sampleRateHz,
                  })),
                  (r = this.audioContext.createMediaStreamSource(this.stream)),
                  (this.analyser = this.audioContext.createAnalyser()),
                  (this.analyser.fftSize = 2 * this.fftSize),
                  (this.analyser.smoothingTimeConstant = 0),
                  r.connect(this.analyser),
                  (this.freqDataQueue = []),
                  (this.freqData = new Float32Array(this.fftSize)),
                  this.includeRawAudio &&
                    ((this.timeDataQueue = []),
                    (this.timeData = new Float32Array(this.fftSize))),
                  (n = Math.max(
                    1,
                    Math.round(this.numFrames * (1 - this.overlapFactor))
                  )),
                  (this.tracker = new y(
                    n,
                    Math.round(
                      this.suppressionTimeMillis / this.frameDurationMillis
                    )
                  )),
                  (this.frameIntervalTask = setInterval(
                    this.onAudioFrame.bind(this),
                    (this.fftSize / this.sampleRateHz) * 1e3
                  )),
                  [2]
                );
            }
          });
        });
      }),
      (e.prototype.onAudioFrame = function () {
        return o(this, void 0, void 0, function () {
          var e, r, n, a;
          return l(this, function (i) {
            switch (i.label) {
              case 0:
                return (
                  this.analyser.getFloatFrequencyData(this.freqData),
                  this.freqData[0] === -1 / 0
                    ? [2]
                    : (this.freqDataQueue.push(
                        this.freqData.slice(0, this.columnTruncateLength)
                      ),
                      this.includeRawAudio &&
                        (this.analyser.getFloatTimeDomainData(this.timeData),
                        this.timeDataQueue.push(this.timeData.slice())),
                      this.freqDataQueue.length > this.numFrames &&
                        this.freqDataQueue.shift(),
                      this.tracker.tick()
                        ? ((e = g(this.freqDataQueue)),
                          (r = v(e, [
                            1,
                            this.numFrames,
                            this.columnTruncateLength,
                            1,
                          ])),
                          (n = void 0),
                          this.includeRawAudio &&
                            ((a = g(this.timeDataQueue)),
                            (n = v(a, [1, this.numFrames * this.fftSize]))),
                          [4, this.spectrogramCallback(r, n)])
                        : [3, 2])
                );
              case 1:
                i.sent() && this.tracker.suppress(),
                  t.dispose([r, n]),
                  (i.label = 2);
              case 2:
                return [2];
            }
          });
        });
      }),
      (e.prototype.stop = function () {
        return o(this, void 0, void 0, function () {
          return l(this, function (e) {
            if (null == this.frameIntervalTask)
              throw new Error(
                "Cannot stop because there is no ongoing streaming activity."
              );
            return (
              clearInterval(this.frameIntervalTask),
              (this.frameIntervalTask = null),
              this.analyser.disconnect(),
              this.audioContext.close(),
              null != this.stream &&
                this.stream.getTracks().length > 0 &&
                this.stream.getTracks()[0].stop(),
              [2]
            );
          });
        });
      }),
      (e.prototype.setConfig = function (e) {
        throw new Error(
          "setConfig() is not implemented for BrowserFftFeatureExtractor."
        );
      }),
      (e.prototype.getFeatures = function () {
        throw new Error(
          "getFeatures() is not implemented for BrowserFftFeatureExtractor. Use the spectrogramCallback field of the constructor config instead."
        );
      }),
      e
    );
  })();
  function g(e) {
    var t = e[0].length,
      r = new Float32Array(e.length * t);
    return (
      e.forEach(function (e, n) {
        return r.set(e, n * t);
      }),
      r
    );
  }
  function v(e, r) {
    var n = new Float32Array(t.util.sizeFromShape(r));
    return n.set(e, n.length - e.length), t.tensor(n, r);
  }
  var y = (function () {
    function e(e, r) {
      var n = this;
      (this.period = e),
        (this.suppressionTime = null == r ? 0 : r),
        (this.counter = 0),
        t.util.assert(this.period > 0, function () {
          return "Expected period to be positive, but got " + n.period;
        });
    }
    return (
      (e.prototype.tick = function () {
        return (
          this.counter++,
          this.counter % this.period == 0 &&
            (null == this.suppressionOnset ||
              this.counter - this.suppressionOnset > this.suppressionTime)
        );
      }),
      (e.prototype.suppress = function () {
        this.suppressionOnset = this.counter;
      }),
      e
    );
  })();
  function b(e) {
    var t = 0;
    e.forEach(function (e) {
      t += e.byteLength;
    });
    var r = new Uint8Array(t),
      n = 0;
    return (
      e.forEach(function (e) {
        r.set(new Uint8Array(e), n), (n += e.byteLength);
      }),
      r.buffer
    );
  }
  function w(e) {
    var t = 0;
    e.forEach(function (e) {
      return (t += e.length);
    });
    var r = new Float32Array(t),
      n = 0;
    return (
      e.forEach(function (e) {
        r.set(e, n), (n += e.length);
      }),
      r
    );
  }
  function x(e) {
    if (null == e) throw new Error("Received null or undefind string");
    for (
      var t = unescape(encodeURIComponent(e)),
        r = new Uint8Array(t.length),
        n = 0;
      n < t.length;
      ++n
    )
      r[n] = t.charCodeAt(n);
    return r.buffer;
  }
  function S(e) {
    if (null == e) throw new Error("Received null or undefind buffer");
    var t = new Uint8Array(e);
    return decodeURIComponent(escape(String.fromCharCode.apply(String, h(t))));
  }
  var E = "TFJSSCDS",
    T = 1,
    F = (function () {
      function e(e) {
        if (((this.examples = {}), (this.label2Ids = {}), null != e))
          for (
            var r = (function (e) {
                t.util.assert(null != e, function () {
                  return "Received null or undefined buffer";
                });
                var r = 0,
                  n = S(e.slice(r, E.length));
                t.util.assert(n === E, function () {
                  return "Deserialization error: Invalid descriptor";
                }),
                  (r += E.length),
                  (r += 4);
                var a = new Uint32Array(e, r, 1),
                  i = (r += 4);
                r = i + a[0];
                var s = S(e.slice(i, r)),
                  o = JSON.parse(s),
                  l = e.slice(r);
                return { manifest: o, data: l };
              })(e),
              n = 0,
              a = 0;
            a < r.manifest.length;
            ++a
          ) {
            var i = r.manifest[a],
              s = i.spectrogramNumFrames * i.spectrogramFrameSize;
            null != i.rawAudioNumSamples && (s += i.rawAudioNumSamples),
              (s *= 4),
              this.addExample(z({ spec: i, data: r.data.slice(n, n + s) })),
              (n += s);
          }
      }
      return (
        (e.prototype.addExample = function (e) {
          t.util.assert(null != e, function () {
            return "Got null or undefined example";
          }),
            t.util.assert(null != e.label && e.label.length > 0, function () {
              return (
                "Expected label to be a non-empty string, but got " +
                JSON.stringify(e.label)
              );
            });
          var r = (function () {
            function e() {
              return Math.floor(65536 * (1 + Math.random()))
                .toString(16)
                .substring(1);
            }
            return (
              e() +
              e() +
              "-" +
              e() +
              "-" +
              e() +
              "-" +
              e() +
              "-" +
              e() +
              e() +
              e()
            );
          })();
          return (
            (this.examples[r] = e),
            e.label in this.label2Ids || (this.label2Ids[e.label] = []),
            this.label2Ids[e.label].push(r),
            r
          );
        }),
        (e.prototype.merge = function (e) {
          var r, n, a, i;
          t.util.assert(e !== this, function () {
            return "Cannot merge a dataset into itself";
          });
          var s = e.getVocabulary();
          try {
            for (var o = u(s), l = o.next(); !l.done; l = o.next()) {
              var c = l.value,
                h = e.getExamples(c);
              try {
                for (
                  var d = ((a = void 0), u(h)), p = d.next();
                  !p.done;
                  p = d.next()
                ) {
                  var f = p.value;
                  this.addExample(f.example);
                }
              } catch (e) {
                a = { error: e };
              } finally {
                try {
                  p && !p.done && (i = d.return) && i.call(d);
                } finally {
                  if (a) throw a.error;
                }
              }
            }
          } catch (e) {
            r = { error: e };
          } finally {
            try {
              l && !l.done && (n = o.return) && n.call(o);
            } finally {
              if (r) throw r.error;
            }
          }
        }),
        (e.prototype.getExampleCounts = function () {
          var e = {};
          for (var t in this.examples) {
            var r = this.examples[t];
            r.label in e || (e[r.label] = 0), e[r.label]++;
          }
          return e;
        }),
        (e.prototype.getExamples = function (e) {
          var r = this;
          t.util.assert(null != e, function () {
            return (
              "Expected label to be a string, but got " + JSON.stringify(e)
            );
          }),
            t.util.assert(e in this.label2Ids, function () {
              return 'No example of label "' + e + '" exists in dataset';
            });
          var n = [];
          return (
            this.label2Ids[e].forEach(function (e) {
              n.push({ uid: e, example: r.examples[e] });
            }),
            n
          );
        }),
        (e.prototype.getData = function (e, r) {
          var a = this;
          t.util.assert(this.size() > 0, function () {
            return "Cannot get spectrograms as tensors because the dataset is empty";
          });
          var i = this.getVocabulary();
          null != e
            ? t.util.assert(-1 !== i.indexOf(e), function () {
                return (
                  "Label " +
                  e +
                  " is not in the vocabulary (" +
                  JSON.stringify(i) +
                  ")"
                );
              })
            : t.util.assert(i.length > 1, function () {
                return (
                  "One-hot encoding of labels requires the vocabulary to have at least two words, but it has only " +
                  i.length +
                  " word."
                );
              }),
            null == r && (r = {});
          var s,
            o,
            l = this.getSortedUniqueNumFrames();
          1 === l.length
            ? ((s = null == r.numFrames ? l[0] : r.numFrames),
              (o = null == r.hopFrames ? 1 : r.hopFrames))
            : ((s = r.numFrames),
              t.util.assert(
                null != s && Number.isInteger(s) && s > 0,
                function () {
                  return (
                    "There are " +
                    l.length +
                    " unique lengths among the " +
                    a.size() +
                    " examples of this Dataset, hence numFrames is required. But it is not provided."
                  );
                }
              ),
              t.util.assert(s <= l[0], function () {
                return (
                  "numFrames (" +
                  s +
                  ") exceeds the minimum numFrames (" +
                  l[0] +
                  ") among the examples of the Dataset."
                );
              }),
              (o = r.hopFrames),
              t.util.assert(
                null != o && Number.isInteger(o) && o > 0,
                function () {
                  return (
                    "There are " +
                    l.length +
                    " unique lengths among the " +
                    a.size() +
                    " examples of this Dataset, hence hopFrames is required. But it is not provided."
                  );
                }
              ));
          var c = null == r.normalize || r.normalize;
          return t.tidy(function () {
            for (
              var l, h, d, f = [], m = [], g = [], v = 0;
              v < i.length;
              ++v
            ) {
              var y = i[v];
              if (null == e || y === e) {
                var b = a.label2Ids[y],
                  w = function (n) {
                    var i,
                      l,
                      h = a.examples[n].spectrogram,
                      b = h.frameSize;
                    null == d
                      ? (d = b)
                      : t.util.assert(b === d, function () {
                          return (
                            "Mismatch in frameSize  (" + b + " vs " + d + ")"
                          );
                        });
                    var w = h.data.length / b,
                      x = null;
                    "_background_noise_" !== y &&
                      (x =
                        null == h.keyFrameIndex
                          ? L(h).dataSync()[0]
                          : h.keyFrameIndex);
                    var S = t.tensor3d(h.data, [w, b, 1]),
                      E = D(w, x, s, o),
                      T = function (n) {
                        var a = t.tidy(function () {
                          var e = t.slice(
                            S,
                            [n[0], 0, 0],
                            [n[1] - n[0], -1, -1]
                          );
                          return c ? p(e) : e;
                        });
                        r.getDataset ? m.push(a.dataSync()) : f.push(a),
                          null == e && g.push(v);
                      };
                    try {
                      for (
                        var F = ((i = void 0), u(E)), M = F.next();
                        !M.done;
                        M = F.next()
                      ) {
                        T(M.value);
                      }
                    } catch (e) {
                      i = { error: e };
                    } finally {
                      try {
                        M && !M.done && (l = F.return) && l.call(F);
                      } finally {
                        if (i) throw i.error;
                      }
                    }
                    t.dispose(S);
                  };
                try {
                  for (
                    var x = ((l = void 0), u(b)), S = x.next();
                    !S.done;
                    S = x.next()
                  ) {
                    w(S.value);
                  }
                } catch (e) {
                  l = { error: e };
                } finally {
                  try {
                    S && !S.done && (h = x.return) && h.call(x);
                  } finally {
                    if (l) throw l.error;
                  }
                }
              }
            }
            null != r.augmentByMixingNoiseRatio &&
              a.augmentByMixingNoise(
                r.getDataset ? m : f,
                g,
                r.augmentByMixingNoiseRatio
              );
            var E = null == r.shuffle || r.shuffle;
            if (r.getDataset) {
              var T = null == r.datasetBatchSize ? 32 : r.datasetBatchSize,
                F =
                  null == r.datasetValidationSplit
                    ? 0.15
                    : r.datasetValidationSplit;
              t.util.assert(F > 0 && F < 1, function () {
                return "Invalid dataset validation split: " + F;
              });
              var M = m.map(function (e, t) {
                return [e, g[t]];
              });
              t.util.shuffle(M),
                (m = M.map(function (e) {
                  return e[0];
                }));
              var z = M.map(function (e) {
                  return e[1];
                }),
                I = (function (e, r, n) {
                  var a, i, s, o, l, c, h, d;
                  t.util.assert(n > 0 && n < 1, function () {
                    return (
                      "validationSplit is expected to be >0 and <1, but got " +
                      n
                    );
                  });
                  for (
                    var p = !Array.isArray(e[0]), f = r, m = [], g = 0;
                    g < f.length;
                    ++g
                  ) {
                    var v = f[g];
                    null == m[v] && (m[v] = []), m[v].push(g);
                  }
                  var y = m.length,
                    b = [],
                    w = [];
                  for (
                    m.map(function (e) {
                      return t.util.shuffle(e);
                    }),
                      g = 0;
                    g < y;
                    ++g
                  )
                    for (
                      var x = m[g], S = Math.round(x.length * (1 - n)), E = 0;
                      E < x.length;
                      ++E
                    )
                      E < S ? b.push(x[E]) : w.push(x[E]);
                  if (p) {
                    var T = [],
                      F = [],
                      M = [],
                      z = [];
                    try {
                      for (var D = u(b), I = D.next(); !I.done; I = D.next()) {
                        var L = I.value;
                        T.push(e[L]), F.push(r[L]);
                      }
                    } catch (e) {
                      a = { error: e };
                    } finally {
                      try {
                        I && !I.done && (i = D.return) && i.call(D);
                      } finally {
                        if (a) throw a.error;
                      }
                    }
                    try {
                      for (var A = u(w), R = A.next(); !R.done; R = A.next())
                        (L = R.value), M.push(e[L]), z.push(r[L]);
                    } catch (e) {
                      s = { error: e };
                    } finally {
                      try {
                        R && !R.done && (o = A.return) && o.call(A);
                      } finally {
                        if (s) throw s.error;
                      }
                    }
                    return { trainXs: T, trainYs: F, valXs: M, valYs: z };
                  }
                  (T = []), (F = []), (M = []), (z = []);
                  try {
                    for (var O = u(b), k = O.next(); !k.done; k = O.next())
                      (L = k.value), T.push(e[L]), F.push(r[L]);
                  } catch (e) {
                    l = { error: e };
                  } finally {
                    try {
                      k && !k.done && (c = O.return) && c.call(O);
                    } finally {
                      if (l) throw l.error;
                    }
                  }
                  try {
                    for (var C = u(w), _ = C.next(); !_.done; _ = C.next())
                      (L = _.value), M.push(e[L]), z.push(r[L]);
                  } catch (e) {
                    h = { error: e };
                  } finally {
                    try {
                      _ && !_.done && (d = C.return) && d.call(C);
                    } finally {
                      if (h) throw h.error;
                    }
                  }
                  return { trainXs: T, trainYs: F, valXs: M, valYs: z };
                })(m, z, F),
                A = I.trainXs,
                R = I.trainYs,
                O = I.valXs,
                k = I.valYs,
                C = n.array(A).map(function (e) {
                  return t.tensor3d(e, [s, d, 1]);
                }),
                _ = n.array(R).map(function (e) {
                  return t.squeeze(t.oneHot([e], i.length), [0]);
                }),
                N = n.zip({ xs: C, ys: _ });
              E && (N = N.shuffle(m.length)), (N = N.batch(T).prefetch(4));
              var U = n.array(O).map(function (e) {
                  return t.tensor3d(e, [s, d, 1]);
                }),
                B = n.array(k).map(function (e) {
                  return t.squeeze(t.oneHot([e], i.length), [0]);
                }),
                H = n.zip({ xs: U, ys: B });
              return [N, (H = H.batch(T).prefetch(4))];
            }
            if (E) {
              var P = [];
              f.forEach(function (e, t) {
                P.push({ x: e, y: g[t] });
              }),
                t.util.shuffle(P),
                (f = P.map(function (e) {
                  return e.x;
                })),
                (g = P.map(function (e) {
                  return e.y;
                }));
            }
            var q =
              null == e
                ? t.cast(t.oneHot(t.tensor1d(g, "int32"), i.length), "float32")
                : void 0;
            return { xs: t.stack(f), ys: q };
          });
        }),
        (e.prototype.augmentByMixingNoise = function (e, r, n) {
          var a, i;
          if (null == e || 0 === e.length)
            throw new Error(
              "Cannot perform augmentation because data is null or empty"
            );
          for (
            var s = e[0] instanceof Float32Array,
              o = this.getVocabulary(),
              l = [],
              c = [],
              d = 0;
            d < r.length;
            ++d
          )
            "_background_noise_" === o[r[d]] ? l.push(d) : c.push(d);
          if (0 === l.length)
            throw new Error(
              "Cannot perform augmentation by mixing with noise when there is no example with label _background_noise_"
            );
          var f = [],
            m = [],
            g = function (a) {
              var i,
                o,
                u =
                  l[
                    ((i = 0),
                    (o = l.length),
                    Math.floor((o - i) * Math.random()) + i)
                  ],
                c = s ? t.tensor1d(e[a]) : e[a],
                h = s ? t.tensor1d(e[u]) : e[u],
                d = t.tidy(function () {
                  return p(t.add(c, t.mul(h, n)));
                });
              s ? f.push(d.dataSync()) : f.push(d), m.push(r[a]);
            };
          try {
            for (var v = u(c), y = v.next(); !y.done; y = v.next()) {
              g(y.value);
            }
          } catch (e) {
            a = { error: e };
          } finally {
            try {
              y && !y.done && (i = v.return) && i.call(v);
            } finally {
              if (a) throw a.error;
            }
          }
          console.log(
            "Data augmentation: mixing noise: added " + f.length + " examples"
          ),
            f.forEach(function (t) {
              return e.push(t);
            }),
            r.push.apply(r, h(m));
        }),
        (e.prototype.getSortedUniqueNumFrames = function () {
          for (
            var e, t, r = new Set(), n = this.getVocabulary(), a = 0;
            a < n.length;
            ++a
          ) {
            var i = n[a],
              s = this.label2Ids[i];
            try {
              for (
                var o = ((e = void 0), u(s)), l = o.next();
                !l.done;
                l = o.next()
              ) {
                var c = l.value,
                  d = this.examples[c].spectrogram,
                  p = d.data.length / d.frameSize;
                r.add(p);
              }
            } catch (t) {
              e = { error: t };
            } finally {
              try {
                l && !l.done && (t = o.return) && t.call(o);
              } finally {
                if (e) throw e.error;
              }
            }
          }
          var f = h(r);
          return f.sort(), f;
        }),
        (e.prototype.removeExample = function (e) {
          if (!(e in this.examples))
            throw new Error("Nonexistent example UID: " + e);
          var t = this.examples[e].label;
          delete this.examples[e];
          var r = this.label2Ids[t].indexOf(e);
          this.label2Ids[t].splice(r, 1),
            0 === this.label2Ids[t].length && delete this.label2Ids[t];
        }),
        (e.prototype.setExampleKeyFrameIndex = function (e, r) {
          if (!(e in this.examples))
            throw new Error("Nonexistent example UID: " + e);
          var n = this.examples[e].spectrogram,
            a = n.data.length / n.frameSize;
          t.util.assert(r >= 0 && r < a && Number.isInteger(r), function () {
            return (
              "Invalid keyFrameIndex: " +
              r +
              ". Must be >= 0, < " +
              a +
              ", and an integer."
            );
          }),
            (n.keyFrameIndex = r);
        }),
        (e.prototype.size = function () {
          return Object.keys(this.examples).length;
        }),
        (e.prototype.durationMillis = function () {
          var e = 0;
          for (var t in this.examples) {
            var r = this.examples[t].spectrogram,
              n = 23.22 | r.frameDurationMillis;
            e += (r.data.length / r.frameSize) * n;
          }
          return e;
        }),
        (e.prototype.empty = function () {
          return 0 === this.size();
        }),
        (e.prototype.clear = function () {
          this.examples = {};
        }),
        (e.prototype.getVocabulary = function () {
          var e = new Set();
          for (var t in this.examples) {
            var r = this.examples[t];
            e.add(r.label);
          }
          var n = h(e);
          return n.sort(), n;
        }),
        (e.prototype.serialize = function (e) {
          var r,
            n,
            a,
            i,
            s = this.getVocabulary();
          t.util.assert(!this.empty(), function () {
            return "Cannot serialize empty Dataset";
          }),
            null != e &&
              (Array.isArray(e) || (e = [e]),
              e.forEach(function (e) {
                if (-1 === s.indexOf(e))
                  throw new Error(
                    'Word label "' +
                      e +
                      '" does not exist in the vocabulary of this dataset. The vocabulary is: ' +
                      JSON.stringify(s) +
                      "."
                  );
              }));
          var o,
            l,
            c,
            h,
            d,
            p = [],
            f = [];
          try {
            for (var m = u(s), g = m.next(); !g.done; g = m.next()) {
              var v = g.value;
              if (null == e || -1 !== e.indexOf(v)) {
                var y = this.label2Ids[v];
                try {
                  for (
                    var w = ((a = void 0), u(y)), S = w.next();
                    !S.done;
                    S = w.next()
                  ) {
                    var F = S.value,
                      z = M(this.examples[F]);
                    p.push(z.spec), f.push(z.data);
                  }
                } catch (e) {
                  a = { error: e };
                } finally {
                  try {
                    S && !S.done && (i = w.return) && i.call(w);
                  } finally {
                    if (a) throw a.error;
                  }
                }
              }
            }
          } catch (e) {
            r = { error: e };
          } finally {
            try {
              g && !g.done && (n = m.return) && n.call(m);
            } finally {
              if (r) throw r.error;
            }
          }
          return (
            (o = { manifest: p, data: b(f) }),
            (l = x(JSON.stringify(o.manifest))),
            (c = x(E)),
            (h = new Uint32Array([T])),
            (d = new Uint32Array([l.byteLength])),
            b([b([c, h.buffer, d.buffer]), l, o.data])
          );
        }),
        e
      );
    })();
  function M(e) {
    var t = null != e.rawAudio,
      r = {
        label: e.label,
        spectrogramNumFrames:
          e.spectrogram.data.length / e.spectrogram.frameSize,
        spectrogramFrameSize: e.spectrogram.frameSize,
      };
    null != e.spectrogram.keyFrameIndex &&
      (r.spectrogramKeyFrameIndex = e.spectrogram.keyFrameIndex);
    var n = e.spectrogram.data.buffer.slice(0);
    return (
      t &&
        ((r.rawAudioNumSamples = e.rawAudio.data.length),
        (r.rawAudioSampleRateHz = e.rawAudio.sampleRateHz),
        (n = b([n, e.rawAudio.data.buffer]))),
      { spec: r, data: n }
    );
  }
  function z(e) {
    var t = {
      frameSize: e.spec.spectrogramFrameSize,
      data: new Float32Array(
        e.data.slice(
          0,
          4 * e.spec.spectrogramFrameSize * e.spec.spectrogramNumFrames
        )
      ),
    };
    null != e.spec.spectrogramKeyFrameIndex &&
      (t.keyFrameIndex = e.spec.spectrogramKeyFrameIndex);
    var r = { label: e.spec.label, spectrogram: t };
    return (
      null != e.spec.rawAudioNumSamples &&
        (r.rawAudio = {
          sampleRateHz: e.spec.rawAudioSampleRateHz,
          data: new Float32Array(
            e.data.slice(
              4 * e.spec.spectrogramFrameSize * e.spec.spectrogramNumFrames
            )
          ),
        }),
      r
    );
  }
  function D(e, r, n, a) {
    if (
      (t.util.assert(Number.isInteger(e) && e > 0, function () {
        return "snippetLength must be a positive integer, but got " + e;
      }),
      null != r &&
        t.util.assert(Number.isInteger(r) && r >= 0, function () {
          return "focusIndex must be a non-negative integer, but got " + r;
        }),
      t.util.assert(Number.isInteger(n) && n > 0, function () {
        return "windowLength must be a positive integer, but got " + n;
      }),
      t.util.assert(Number.isInteger(a) && a > 0, function () {
        return "windowHop must be a positive integer, but got " + a;
      }),
      t.util.assert(n <= e, function () {
        return "windowLength (" + n + ") exceeds snippetLength (" + e + ")";
      }),
      t.util.assert(r < e, function () {
        return (
          "focusIndex (" + r + ") equals or exceeds snippetLength (" + e + ")"
        );
      }),
      n === e)
    )
      return [[0, e]];
    var i = [];
    if (null == r) {
      for (var s = 0; s + n <= e; ) i.push([s, s + n]), (s += a);
      return i;
    }
    var o = Math.floor(n / 2),
      l = r - o;
    for (
      l < 0 ? (l = 0) : l + n > e && (l = e - n);
      !(l - a < 0 || r >= l - a + n);

    )
      l -= a;
    for (; l + n <= e && !(r < l); ) i.push([l, l + n]), (l += a);
    return i;
  }
  function I(e) {
    return t.tidy(function () {
      var r = e.data.length / e.frameSize,
        n = t.tensor2d(e.data, [r, e.frameSize]);
      return t.mean(n, -1);
    });
  }
  function L(e) {
    return t.tidy(function () {
      return t.argMax(I(e));
    });
  }
  var A = "0.5.4",
    R = "tfjs-speech-commands-saved-model-metadata",
    O = "indexeddb://tfjs-speech-commands-model/",
    k = {
      localStorage: "undefined" == typeof window ? null : window.localStorage,
    };
  var C = (function () {
      function e(r, n, a) {
        (this.MODEL_URL_PREFIX =
          "https://storage.googleapis.com/tfjs-models/tfjs/speech-commands/v" +
          A.split(".").slice(0, 2).join(".") +
          "/browser_fft"),
          (this.SAMPLE_RATE_HZ = 44100),
          (this.FFT_SIZE = 1024),
          (this.DEFAULT_SUPPRESSION_TIME_MILLIS = 0),
          (this.streaming = !1),
          (this.transferRecognizers = {}),
          t.util.assert(
            (null == n && null == a) || (null != n && null != a),
            function () {
              return "modelURL and metadataURL must be both provided or both not provided.";
            }
          ),
          null == n
            ? (null == r
                ? (r = e.DEFAULT_VOCABULARY_NAME)
                : t.util.assert(
                    -1 !== e.VALID_VOCABULARY_NAMES.indexOf(r),
                    function () {
                      return "Invalid vocabulary name: '" + r + "'";
                    }
                  ),
              (this.vocabulary = r),
              (this.modelArtifactsOrURL =
                this.MODEL_URL_PREFIX + "/" + this.vocabulary + "/model.json"),
              (this.metadataOrURL =
                this.MODEL_URL_PREFIX +
                "/" +
                this.vocabulary +
                "/metadata.json"))
            : (t.util.assert(null == r, function () {
                return "vocabulary name must be null or undefined when modelURL is provided";
              }),
              (this.modelArtifactsOrURL = n),
              (this.metadataOrURL = a)),
          (this.parameters = {
            sampleRateHz: this.SAMPLE_RATE_HZ,
            fftSize: this.FFT_SIZE,
          });
      }
      return (
        (e.prototype.listen = function (e, r) {
          return o(this, void 0, void 0, function () {
            var n,
              a,
              i,
              s,
              u,
              d = this;
            return l(this, function (f) {
              switch (f.label) {
                case 0:
                  if (this.streaming)
                    throw new Error(
                      "Cannot start streaming again when streaming is ongoing."
                    );
                  return [4, this.ensureModelLoaded()];
                case 1:
                  if (
                    (f.sent(),
                    null == r && (r = {}),
                    (n =
                      null == r.probabilityThreshold
                        ? 0
                        : r.probabilityThreshold),
                    r.includeEmbedding && (n = 0),
                    t.util.assert(n >= 0 && n <= 1, function () {
                      return "Invalid probabilityThreshold value: " + n;
                    }),
                    (a =
                      null != r.invokeCallbackOnNoiseAndUnknown &&
                      r.invokeCallbackOnNoiseAndUnknown),
                    r.includeEmbedding && (a = !0),
                    r.suppressionTimeMillis < 0)
                  )
                    throw new Error(
                      "suppressionTimeMillis is expected to be >= 0, but got " +
                        r.suppressionTimeMillis
                    );
                  return (
                    (i = null == r.overlapFactor ? 0.5 : r.overlapFactor),
                    t.util.assert(i >= 0 && i < 1, function () {
                      return (
                        "Expected overlapFactor to be >= 0 and < 1, but got " +
                        i
                      );
                    }),
                    (s = function (i, s) {
                      return o(d, void 0, void 0, function () {
                        var s, o, u, d, f, m, g, v, y, b, w;
                        return l(this, function (l) {
                          switch (l.label) {
                            case 0:
                              return (
                                (s = p(i)),
                                r.includeEmbedding
                                  ? [
                                      4,
                                      this.ensureModelWithEmbeddingOutputCreated(),
                                    ]
                                  : [3, 2]
                              );
                            case 1:
                              return (
                                l.sent(),
                                (w = c(
                                  this.modelWithEmbeddingOutput.predict(s),
                                  2
                                )),
                                (o = w[0]),
                                (u = w[1]),
                                [3, 3]
                              );
                            case 2:
                              (o = this.model.predict(s)), (l.label = 3);
                            case 3:
                              return [4, o.data()];
                            case 4:
                              return (
                                (d = l.sent()), [4, (f = o.argMax(-1)).data()]
                              );
                            case 5:
                              return (
                                (m = l.sent()[0]),
                                (g = Math.max.apply(Math, h(d))),
                                t.dispose([o, f, s]),
                                g < n ? [2, !1] : [3, 6]
                              );
                            case 6:
                              return (
                                (v = void 0),
                                r.includeSpectrogram
                                  ? ((y = {}), [4, i.data()])
                                  : [3, 8]
                              );
                            case 7:
                              (y.data = l.sent()),
                                (y.frameSize = this.nonBatchInputShape[1]),
                                (v = y),
                                (l.label = 8);
                            case 8:
                              return (
                                (b = !0),
                                a ||
                                  ("_background_noise_" !== this.words[m] &&
                                    "_unknown_" !== this.words[m]) ||
                                  (b = !1),
                                b &&
                                  e({
                                    scores: d,
                                    spectrogram: v,
                                    embedding: u,
                                  }),
                                [2, b]
                              );
                          }
                        });
                      });
                    }),
                    (u =
                      null == r.suppressionTimeMillis
                        ? this.DEFAULT_SUPPRESSION_TIME_MILLIS
                        : r.suppressionTimeMillis),
                    (this.audioDataExtractor = new m({
                      sampleRateHz: this.parameters.sampleRateHz,
                      numFramesPerSpectrogram: this.nonBatchInputShape[0],
                      columnTruncateLength: this.nonBatchInputShape[1],
                      suppressionTimeMillis: u,
                      spectrogramCallback: s,
                      overlapFactor: i,
                    })),
                    [4, this.audioDataExtractor.start(r.audioTrackConstraints)]
                  );
                case 2:
                  return f.sent(), (this.streaming = !0), [2];
              }
            });
          });
        }),
        (e.prototype.ensureModelLoaded = function () {
          return o(this, void 0, void 0, function () {
            var e,
              r,
              n,
              i,
              s = this;
            return l(this, function (o) {
              switch (o.label) {
                case 0:
                  return null != this.model
                    ? [2]
                    : [4, this.ensureMetadataLoaded()];
                case 1:
                  return (
                    o.sent(),
                    "string" != typeof this.modelArtifactsOrURL
                      ? [3, 3]
                      : [4, a.loadLayersModel(this.modelArtifactsOrURL)]
                  );
                case 2:
                  return (e = o.sent()), [3, 5];
                case 3:
                  return [
                    4,
                    a.loadLayersModel(
                      t.io.fromMemory(
                        this.modelArtifactsOrURL.modelTopology,
                        this.modelArtifactsOrURL.weightSpecs,
                        this.modelArtifactsOrURL.weightData
                      )
                    ),
                  ];
                case 4:
                  (e = o.sent()), (o.label = 5);
                case 5:
                  if (1 !== e.inputs.length)
                    throw new Error(
                      "Expected model to have 1 input, but got a model with " +
                        e.inputs.length +
                        " inputs"
                    );
                  if (4 !== e.inputs[0].shape.length)
                    throw new Error(
                      "Expected model to have an input shape of rank 4, but got an input shape of rank " +
                        e.inputs[0].shape.length
                    );
                  if (1 !== e.inputs[0].shape[3])
                    throw new Error(
                      "Expected model to have an input shape with 1 as the last dimension, but got input shape" +
                        JSON.stringify(e.inputs[0].shape[3]) +
                        "}"
                    );
                  if (2 !== (r = e.outputShape).length)
                    throw new Error(
                      "Expected loaded model to have an output shape of rank 2,but received shape " +
                        JSON.stringify(r)
                    );
                  if (r[1] !== this.words.length)
                    throw new Error(
                      "Mismatch between the last dimension of model's output shape (" +
                        r[1] +
                        ") and number of words (" +
                        this.words.length +
                        ")."
                    );
                  return (
                    (this.model = e),
                    this.freezeModel(),
                    (this.nonBatchInputShape = e.inputs[0].shape.slice(1)),
                    (this.elementsPerExample = 1),
                    e.inputs[0].shape.slice(1).forEach(function (e) {
                      return (s.elementsPerExample *= e);
                    }),
                    this.warmUpModel(),
                    (n =
                      (this.parameters.fftSize / this.parameters.sampleRateHz) *
                      1e3),
                    (i = e.inputs[0].shape[1]),
                    (this.parameters.spectrogramDurationMillis = i * n),
                    [2]
                  );
              }
            });
          });
        }),
        (e.prototype.ensureModelWithEmbeddingOutputCreated = function () {
          return o(this, void 0, void 0, function () {
            var e, t;
            return l(this, function (r) {
              switch (r.label) {
                case 0:
                  return null != this.modelWithEmbeddingOutput
                    ? [2]
                    : [4, this.ensureModelLoaded()];
                case 1:
                  for (r.sent(), t = this.model.layers.length - 2; t >= 0; --t)
                    if ("Dense" === this.model.layers[t].getClassName()) {
                      e = this.model.layers[t];
                      break;
                    }
                  if (null == e)
                    throw new Error(
                      "Failed to find second last dense layer in the original model."
                    );
                  return (
                    (this.modelWithEmbeddingOutput = a.model({
                      inputs: this.model.inputs,
                      outputs: [this.model.outputs[0], e.output],
                    })),
                    [2]
                  );
              }
            });
          });
        }),
        (e.prototype.warmUpModel = function () {
          var e = this;
          t.tidy(function () {
            for (
              var r = t.zeros([1].concat(e.nonBatchInputShape)), n = 0;
              n < 3;
              ++n
            )
              e.model.predict(r);
          });
        }),
        (e.prototype.ensureMetadataLoaded = function () {
          return o(this, void 0, void 0, function () {
            var e, t, n;
            return l(this, function (a) {
              switch (a.label) {
                case 0:
                  return null != this.words
                    ? [2]
                    : "string" != typeof this.metadataOrURL
                    ? [3, 2]
                    : [
                        4,
                        (function (e) {
                          return o(this, void 0, void 0, function () {
                            var t, n, a, i, s, o, u;
                            return l(this, function (l) {
                              switch (l.label) {
                                case 0:
                                  return (
                                    (t = "http://"),
                                    (n = "https://"),
                                    (a = "file://"),
                                    0 !== e.indexOf(t) && 0 !== e.indexOf(n)
                                      ? [3, 3]
                                      : [4, fetch(e)]
                                  );
                                case 1:
                                  return [4, l.sent().json()];
                                case 2:
                                  return [2, l.sent()];
                                case 3:
                                  return 0 !== e.indexOf(a)
                                    ? [3, 5]
                                    : ((i = require("fs")),
                                      (s = r.promisify(i.readFile)),
                                      (u = (o = JSON).parse),
                                      [
                                        4,
                                        s(e.slice(a.length), {
                                          encoding: "utf-8",
                                        }),
                                      ]);
                                case 4:
                                  return [2, u.apply(o, [l.sent()])];
                                case 5:
                                  throw new Error(
                                    "Unsupported URL scheme in metadata URL: " +
                                      e +
                                      ". Supported schemes are: http://, https://, and (node.js-only) file://"
                                  );
                              }
                            });
                          });
                        })(this.metadataOrURL),
                      ];
                case 1:
                  return (t = a.sent()), [3, 3];
                case 2:
                  (t = this.metadataOrURL), (a.label = 3);
                case 3:
                  if (null == (e = t).wordLabels) {
                    if (null == (n = e.words))
                      throw new Error(
                        'Cannot find field "words" or "wordLabels" in metadata JSON file'
                      );
                    this.words = n;
                  } else this.words = e.wordLabels;
                  return [2];
              }
            });
          });
        }),
        (e.prototype.stopListening = function () {
          return o(this, void 0, void 0, function () {
            return l(this, function (e) {
              switch (e.label) {
                case 0:
                  if (!this.streaming)
                    throw new Error(
                      "Cannot stop streaming when streaming is not ongoing."
                    );
                  return [4, this.audioDataExtractor.stop()];
                case 1:
                  return e.sent(), (this.streaming = !1), [2];
              }
            });
          });
        }),
        (e.prototype.isListening = function () {
          return this.streaming;
        }),
        (e.prototype.wordLabels = function () {
          return this.words;
        }),
        (e.prototype.params = function () {
          return this.parameters;
        }),
        (e.prototype.modelInputShape = function () {
          if (null == this.model)
            throw new Error(
              "Model has not been loaded yet. Load model by calling ensureModelLoaded(), recognize(), or listen()."
            );
          return this.model.inputs[0].shape;
        }),
        (e.prototype.recognize = function (e, r) {
          return o(this, void 0, void 0, function () {
            var n, a, i, s, o, u, c, h, d, p, f, m, g;
            return l(this, function (l) {
              switch (l.label) {
                case 0:
                  return null == r && (r = {}), [4, this.ensureModelLoaded()];
                case 1:
                  return (
                    l.sent(), null != e ? [3, 3] : [4, this.recognizeOnline()]
                  );
                case 2:
                  (n = l.sent()), (e = n.data), (l.label = 3);
                case 3:
                  if (e instanceof t.Tensor)
                    this.checkInputTensorShape(e), (i = e), (a = e.shape[0]);
                  else {
                    if (e.length % this.elementsPerExample)
                      throw new Error(
                        "The length of the input Float32Array " +
                          e.length +
                          " is not divisible by the number of tensor elements per per example expected by the model " +
                          this.elementsPerExample +
                          "."
                      );
                    (a = e.length / this.elementsPerExample),
                      (i = t.tensor4d(e, [a].concat(this.nonBatchInputShape)));
                  }
                  return (
                    (o = { scores: null }),
                    r.includeEmbedding
                      ? [4, this.ensureModelWithEmbeddingOutputCreated()]
                      : [3, 5]
                  );
                case 4:
                  return (
                    l.sent(),
                    (u = this.modelWithEmbeddingOutput.predict(i)),
                    (s = u[0]),
                    (o.embedding = u[1]),
                    [3, 6]
                  );
                case 5:
                  (s = this.model.predict(i)), (l.label = 6);
                case 6:
                  return 1 !== a ? [3, 8] : ((c = o), [4, s.data()]);
                case 7:
                  return (c.scores = l.sent()), [3, 10];
                case 8:
                  return (
                    (h = t.unstack(s)),
                    (d = h.map(function (e) {
                      return e.data();
                    })),
                    (p = o),
                    [4, Promise.all(d)]
                  );
                case 9:
                  (p.scores = l.sent()), t.dispose(h), (l.label = 10);
                case 10:
                  return r.includeSpectrogram
                    ? ((f = o),
                      (m = {}),
                      e instanceof t.Tensor ? [4, e.data()] : [3, 12])
                    : [3, 14];
                case 11:
                  return (g = l.sent()), [3, 13];
                case 12:
                  (g = e), (l.label = 13);
                case 13:
                  (f.spectrogram =
                    ((m.data = g),
                    (m.frameSize = this.nonBatchInputShape[1]),
                    m)),
                    (l.label = 14);
                case 14:
                  return t.dispose(s), [2, o];
              }
            });
          });
        }),
        (e.prototype.recognizeOnline = function () {
          return o(this, void 0, void 0, function () {
            var e = this;
            return l(this, function (t) {
              return [
                2,
                new Promise(function (t, r) {
                  (e.audioDataExtractor = new m({
                    sampleRateHz: e.parameters.sampleRateHz,
                    numFramesPerSpectrogram: e.nonBatchInputShape[0],
                    columnTruncateLength: e.nonBatchInputShape[1],
                    suppressionTimeMillis: 0,
                    spectrogramCallback: function (r) {
                      return o(e, void 0, void 0, function () {
                        var e, n, a;
                        return l(this, function (i) {
                          switch (i.label) {
                            case 0:
                              return (
                                (e = p(r)), [4, this.audioDataExtractor.stop()]
                              );
                            case 1:
                              return i.sent(), (n = t), (a = {}), [4, e.data()];
                            case 2:
                              return (
                                n.apply(void 0, [
                                  ((a.data = i.sent()),
                                  (a.frameSize = this.nonBatchInputShape[1]),
                                  a),
                                ]),
                                e.dispose(),
                                [2, !1]
                              );
                          }
                        });
                      });
                    },
                    overlapFactor: 0,
                  })),
                    e.audioDataExtractor.start();
                }),
              ];
            });
          });
        }),
        (e.prototype.createTransfer = function (e) {
          if (null == this.model)
            throw new Error(
              "Model has not been loaded yet. Load model by calling ensureModelLoaded(), recognizer(), or listen()."
            );
          t.util.assert(
            null != e && "string" == typeof e && e.length > 1,
            function () {
              return (
                "Expected the name for a transfer-learning recognized to be a non-empty string, but got " +
                JSON.stringify(e)
              );
            }
          ),
            t.util.assert(null == this.transferRecognizers[e], function () {
              return (
                "There is already a transfer-learning model named '" + e + "'"
              );
            });
          var r = new _(e, this.parameters, this.model);
          return (this.transferRecognizers[e] = r), r;
        }),
        (e.prototype.freezeModel = function () {
          var e, t;
          try {
            for (
              var r = u(this.model.layers), n = r.next();
              !n.done;
              n = r.next()
            ) {
              n.value.trainable = !1;
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              n && !n.done && (t = r.return) && t.call(r);
            } finally {
              if (e) throw e.error;
            }
          }
        }),
        (e.prototype.checkInputTensorShape = function (e) {
          var r = this.model.inputs[0].shape.length;
          if (e.shape.length !== r)
            throw new Error(
              "Expected input Tensor to have rank " +
                r +
                ", but got rank " +
                e.shape.length +
                " that differs "
            );
          var n = e.shape.slice(1),
            a = this.model.inputs[0].shape.slice(1);
          if (!t.util.arraysEqual(n, a))
            throw new Error(
              "Expected input to have shape [null," +
                a +
                "], but got shape [null," +
                n +
                "]"
            );
        }),
        (e.VALID_VOCABULARY_NAMES = ["18w", "directional4w"]),
        (e.DEFAULT_VOCABULARY_NAME = "18w"),
        e
      );
    })(),
    _ = (function (e) {
      function r(r, n, a) {
        var i = e.call(this) || this;
        return (
          (i.name = r),
          (i.parameters = n),
          (i.baseModel = a),
          t.util.assert(
            null != r && "string" == typeof r && r.length > 0,
            function () {
              return (
                "The name of a transfer model must be a non-empty string, but got " +
                JSON.stringify(r)
              );
            }
          ),
          (i.nonBatchInputShape = i.baseModel.inputs[0].shape.slice(1)),
          (i.words = null),
          (i.dataset = new F()),
          i
        );
      }
      return (
        (function (e, t) {
          function r() {
            this.constructor = e;
          }
          i(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((r.prototype = t.prototype), new r()));
        })(r, e),
        (r.prototype.collectExample = function (e, r) {
          return o(this, void 0, void 0, function () {
            var n,
              a,
              i,
              s,
              u = this;
            return l(this, function (c) {
              if (
                (t.util.assert(!this.streaming, function () {
                  return "Cannot start collection of transfer-learning example because a streaming recognition or transfer-learning example collection is ongoing";
                }),
                t.util.assert(
                  null != e && "string" == typeof e && e.length > 0,
                  function () {
                    return "Must provide a non-empty string when collecting transfer-learning example";
                  }
                ),
                null == r && (r = {}),
                null != r.durationMultiplier && null != r.durationSec)
              )
                throw new Error(
                  "durationMultiplier and durationSec are mutually exclusive, but are both specified."
                );
              return (
                null != r.durationSec
                  ? (t.util.assert(r.durationSec > 0, function () {
                      return (
                        "Expected durationSec to be > 0, but got " +
                        r.durationSec
                      );
                    }),
                    (a =
                      this.parameters.fftSize / this.parameters.sampleRateHz),
                    (n = Math.ceil(r.durationSec / a)))
                  : null != r.durationMultiplier
                  ? (t.util.assert(r.durationMultiplier >= 1, function () {
                      return (
                        "Expected duration multiplier to be >= 1, but got " +
                        r.durationMultiplier
                      );
                    }),
                    (n = Math.round(
                      this.nonBatchInputShape[0] * r.durationMultiplier
                    )))
                  : (n = this.nonBatchInputShape[0]),
                null != r.snippetDurationSec &&
                  (t.util.assert(r.snippetDurationSec > 0, function () {
                    return (
                      "snippetDurationSec is expected to be > 0, but got " +
                      r.snippetDurationSec
                    );
                  }),
                  t.util.assert(null != r.onSnippet, function () {
                    return "onSnippet must be provided if snippetDurationSec is provided.";
                  })),
                null != r.onSnippet &&
                  t.util.assert(null != r.snippetDurationSec, function () {
                    return "snippetDurationSec must be provided if onSnippet is provided.";
                  }),
                (i = this.parameters.fftSize / this.parameters.sampleRateHz),
                (s = i * n),
                (this.streaming = !0),
                [
                  2,
                  new Promise(function (t) {
                    var a =
                        null == r.snippetDurationSec
                          ? 1
                          : r.snippetDurationSec / s,
                      i = 1 - a,
                      c = Math.round(1 / a),
                      h = 0,
                      d = -1,
                      g = [];
                    (u.audioDataExtractor = new m({
                      sampleRateHz: u.parameters.sampleRateHz,
                      numFramesPerSpectrogram: n,
                      columnTruncateLength: u.nonBatchInputShape[1],
                      suppressionTimeMillis: 0,
                      spectrogramCallback: function (n, a) {
                        return o(u, void 0, void 0, function () {
                          var i,
                            s,
                            o,
                            u,
                            m,
                            v,
                            y,
                            b,
                            x,
                            S,
                            E,
                            T,
                            F,
                            M,
                            z,
                            D,
                            I,
                            L,
                            A,
                            R;
                          return l(this, function (l) {
                            switch (l.label) {
                              case 0:
                                return null != r.onSnippet
                                  ? [3, 7]
                                  : ((i = p(n)),
                                    (o = (s = this.dataset).addExample),
                                    (u = { label: e }),
                                    (m = {}),
                                    [4, i.data()]);
                              case 1:
                                return (
                                  (u.spectrogram =
                                    ((m.data = l.sent()),
                                    (m.frameSize = this.nonBatchInputShape[1]),
                                    m)),
                                  r.includeRawAudio
                                    ? ((y = {}), [4, a.data()])
                                    : [3, 3]
                                );
                              case 2:
                                return (
                                  (y.data = l.sent()),
                                  (y.sampleRateHz =
                                    this.audioDataExtractor.sampleRateHz),
                                  (v = y),
                                  [3, 4]
                                );
                              case 3:
                                (v = void 0), (l.label = 4);
                              case 4:
                                return (
                                  o.apply(s, [((u.rawAudio = v), u)]),
                                  i.dispose(),
                                  [4, this.audioDataExtractor.stop()]
                                );
                              case 5:
                                return (
                                  l.sent(),
                                  (this.streaming = !1),
                                  this.collateTransferWords(),
                                  (b = t),
                                  (x = {}),
                                  [4, n.data()]
                                );
                              case 6:
                                return (
                                  b.apply(void 0, [
                                    ((x.data = l.sent()),
                                    (x.frameSize = this.nonBatchInputShape[1]),
                                    x),
                                  ]),
                                  [3, 13]
                                );
                              case 7:
                                return [4, n.data()];
                              case 8:
                                for (
                                  S = l.sent(),
                                    -1 === d && (d = S.length),
                                    E = d - 1;
                                  0 !== S[E] && E >= 0;

                                )
                                  E--;
                                return (
                                  (T = d - E - 1),
                                  (d = E + 1),
                                  (F = S.slice(S.length - T, S.length)),
                                  g.push(F),
                                  null != r.onSnippet &&
                                    r.onSnippet({
                                      data: F,
                                      frameSize: this.nonBatchInputShape[1],
                                    }),
                                  h++ !== c
                                    ? [3, 13]
                                    : [4, this.audioDataExtractor.stop()]
                                );
                              case 9:
                                return (
                                  l.sent(),
                                  (this.streaming = !1),
                                  this.collateTransferWords(),
                                  (M = f(w(g))),
                                  (z = {
                                    data: M,
                                    frameSize: this.nonBatchInputShape[1],
                                  }),
                                  (I = (D = this.dataset).addExample),
                                  (L = { label: e, spectrogram: z }),
                                  r.includeRawAudio
                                    ? ((R = {}), [4, a.data()])
                                    : [3, 11]
                                );
                              case 10:
                                return (
                                  (R.data = l.sent()),
                                  (R.sampleRateHz =
                                    this.audioDataExtractor.sampleRateHz),
                                  (A = R),
                                  [3, 12]
                                );
                              case 11:
                                (A = void 0), (l.label = 12);
                              case 12:
                                I.apply(D, [((L.rawAudio = A), L)]),
                                  t(z),
                                  (l.label = 13);
                              case 13:
                                return [2, !1];
                            }
                          });
                        });
                      },
                      overlapFactor: i,
                      includeRawAudio: r.includeRawAudio,
                    })),
                      u.audioDataExtractor.start(r.audioTrackConstraints);
                  }),
                ]
              );
            });
          });
        }),
        (r.prototype.clearExamples = function () {
          var e = this;
          t.util.assert(
            null != this.words &&
              this.words.length > 0 &&
              !this.dataset.empty(),
            function () {
              return (
                "No transfer learning examples exist for model name " + e.name
              );
            }
          ),
            this.dataset.clear(),
            (this.words = null);
        }),
        (r.prototype.countExamples = function () {
          if (this.dataset.empty())
            throw new Error(
              "No examples have been collected for transfer-learning model named '" +
                this.name +
                "' yet."
            );
          return this.dataset.getExampleCounts();
        }),
        (r.prototype.getExamples = function (e) {
          return this.dataset.getExamples(e);
        }),
        (r.prototype.setExampleKeyFrameIndex = function (e, t) {
          this.dataset.setExampleKeyFrameIndex(e, t);
        }),
        (r.prototype.removeExample = function (e) {
          this.dataset.removeExample(e), this.collateTransferWords();
        }),
        (r.prototype.isDatasetEmpty = function () {
          return this.dataset.empty();
        }),
        (r.prototype.loadExamples = function (e, t) {
          var r, n, a, i;
          void 0 === t && (t = !1);
          var s = new F(e);
          t && this.clearExamples();
          var o = s.getVocabulary();
          console.log(
            JSON.parse(k.localStorage.getItem(R)),
            k.localStorage,
            r,
            this.name
          );
          try {
            for (var l = u(o), c = l.next(); !c.done; c = l.next()) {
              var h = c.value,
                d = s.getExamples(h);
              try {
                for (
                  var p = ((a = void 0), u(d)), f = p.next();
                  !f.done;
                  f = p.next()
                ) {
                  var m = f.value;
                  this.dataset.addExample(m.example);
                }
              } catch (e) {
                a = { error: e };
              } finally {
                try {
                  f && !f.done && (i = p.return) && i.call(p);
                } finally {
                  if (a) throw a.error;
                }
              }
            }
          } catch (e) {
            r = { error: e };
          } finally {
            try {
              c && !c.done && (n = l.return) && n.call(l);
            } finally {
              if (r) throw r.error;
            }
          }
          this.collateTransferWords();
        }),
        (r.prototype.serializeExamples = function (e) {
          return this.dataset.serialize(e);
        }),
        (r.prototype.collateTransferWords = function () {
          this.words = this.dataset.getVocabulary();
        }),
        (r.prototype.collectTransferDataAsTensors = function (e, t) {
          var r = this.nonBatchInputShape[0];
          e = e || 0.25;
          var n = Math.round(e * r),
            a = this.dataset.getData(
              null,
              s({ numFrames: r, hopFrames: n }, t)
            );
          return { xs: a.xs, ys: a.ys };
        }),
        (r.prototype.collectTransferDataAsTfDataset = function (e, t, r, n) {
          void 0 === t && (t = 0.15), void 0 === r && (r = 32);
          var a = this.nonBatchInputShape[0];
          e = e || 0.25;
          var i = Math.round(e * a);
          return this.dataset.getData(
            null,
            s(
              {
                numFrames: a,
                hopFrames: i,
                getDataset: !0,
                datasetBatchSize: r,
                datasetValidationSplit: t,
              },
              n
            )
          );
        }),
        (r.prototype.train = function (e) {
          return o(this, void 0, void 0, function () {
            var r,
              n = this;
            return l(this, function (a) {
              return (
                t.util.assert(
                  null != this.words && this.words.length > 0,
                  function () {
                    return (
                      "Cannot train transfer-learning model '" +
                      n.name +
                      "' because no transfer learning example has been collected."
                    );
                  }
                ),
                t.util.assert(this.words.length > 1, function () {
                  return (
                    "Cannot train transfer-learning model '" +
                    n.name +
                    "' because only 1 word label ('" +
                    JSON.stringify(n.words) +
                    "') has been collected for transfer learning. Requires at least 2."
                  );
                }),
                null != e.fineTuningEpochs &&
                  t.util.assert(
                    e.fineTuningEpochs >= 0 &&
                      Number.isInteger(e.fineTuningEpochs),
                    function () {
                      return (
                        "If specified, fineTuningEpochs must be a non-negative integer, but received " +
                        e.fineTuningEpochs
                      );
                    }
                  ),
                null == e && (e = {}),
                null == this.model && this.createTransferModelFromBaseModel(),
                (this.secondLastBaseDenseLayer.trainable = !1),
                this.model.compile({
                  loss: "categoricalCrossentropy",
                  optimizer: e.optimizer || "sgd",
                  metrics: ["acc"],
                }),
                (r =
                  null == e.fitDatasetDurationMillisThreshold
                    ? 6e4
                    : e.fitDatasetDurationMillisThreshold),
                this.dataset.durationMillis() > r
                  ? (console.log(
                      "Detected large dataset: total duration = " +
                        this.dataset.durationMillis() +
                        " ms > " +
                        r +
                        " ms. Training transfer model using fitDataset() instead of fit()"
                    ),
                    [2, this.trainOnDataset(e)])
                  : [2, this.trainOnTensors(e)]
              );
            });
          });
        }),
        (r.prototype.trainOnDataset = function (e) {
          return o(this, void 0, void 0, function () {
            var r, n, a, i, s, o, u, h, d;
            return l(this, function (l) {
              switch (l.label) {
                case 0:
                  return (
                    t.util.assert(e.epochs > 0, function () {
                      return "Invalid config.epochs";
                    }),
                    (r = null == e.batchSize ? 32 : e.batchSize),
                    (n = e.windowHopRatio || 0.25),
                    (a = c(
                      this.collectTransferDataAsTfDataset(
                        n,
                        e.validationSplit,
                        r,
                        {
                          augmentByMixingNoiseRatio:
                            e.augmentByMixingNoiseRatio,
                        }
                      ),
                      2
                    )),
                    (i = a[0]),
                    (s = a[1]),
                    (o = t.util.now()),
                    [
                      4,
                      this.model.fitDataset(i, {
                        epochs: e.epochs,
                        validationData: e.validationSplit > 0 ? s : null,
                        callbacks: null == e.callback ? null : [e.callback],
                      }),
                    ]
                  );
                case 1:
                  return (
                    (u = l.sent()),
                    console.log(
                      "fitDataset() took " +
                        (t.util.now() - o).toFixed(2) +
                        " ms"
                    ),
                    null != e.fineTuningEpochs && e.fineTuningEpochs > 0
                      ? ((h = t.util.now()),
                        [4, this.fineTuningUsingTfDatasets(e, i, s)])
                      : [3, 3]
                  );
                case 2:
                  return (
                    (d = l.sent()),
                    console.log(
                      "fitDataset() (fine-tuning) took " +
                        (t.util.now() - h).toFixed(2) +
                        " ms"
                    ),
                    [2, [u, d]]
                  );
                case 3:
                  return [2, u];
              }
            });
          });
        }),
        (r.prototype.trainOnTensors = function (e) {
          return o(this, void 0, void 0, function () {
            var r, n, a, i, s, o, u, c, h, d;
            return l(this, function (l) {
              switch (l.label) {
                case 0:
                  (r = e.windowHopRatio || 0.25),
                    (n = this.collectTransferDataAsTensors(r, {
                      augmentByMixingNoiseRatio: e.augmentByMixingNoiseRatio,
                    })),
                    (a = n.xs),
                    (i = n.ys),
                    console.log(
                      "Training data: xs.shape = " +
                        a.shape +
                        ", ys.shape = " +
                        i.shape
                    ),
                    (l.label = 1);
                case 1:
                  return (
                    l.trys.push([1, , 6, 7]),
                    null != e.validationSplit
                      ? ((c = (function (e, r, n) {
                          return (
                            t.util.assert(n > 0 && n < 1, function () {
                              return (
                                "validationSplit is expected to be >0 and <1, but got " +
                                n
                              );
                            }),
                            t.tidy(function () {
                              for (
                                var a = t.argMax(r, -1).dataSync(),
                                  i = [],
                                  s = 0;
                                s < a.length;
                                ++s
                              ) {
                                var o = a[s];
                                null == i[o] && (i[o] = []), i[o].push(s);
                              }
                              var l = i.length,
                                u = [],
                                c = [];
                              for (
                                i.map(function (e) {
                                  return t.util.shuffle(e);
                                }),
                                  s = 0;
                                s < l;
                                ++s
                              )
                                for (
                                  var h = i[s],
                                    d = Math.round(h.length * (1 - n)),
                                    p = 0;
                                  p < h.length;
                                  ++p
                                )
                                  p < d ? u.push(h[p]) : c.push(h[p]);
                              return {
                                trainXs: t.gather(e, u),
                                trainYs: t.gather(r, u),
                                valXs: t.gather(e, c),
                                valYs: t.gather(r, c),
                              };
                            })
                          );
                        })(a, i, e.validationSplit)),
                        (s = c.trainXs),
                        (o = c.trainYs),
                        (u = [c.valXs, c.valYs]))
                      : ((s = a), (o = i)),
                    [
                      4,
                      this.model.fit(s, o, {
                        epochs: null == e.epochs ? 20 : e.epochs,
                        validationData: u,
                        batchSize: e.batchSize,
                        callbacks: null == e.callback ? null : [e.callback],
                      }),
                    ]
                  );
                case 2:
                  return (
                    (h = l.sent()),
                    null != e.fineTuningEpochs && e.fineTuningEpochs > 0
                      ? [4, this.fineTuningUsingTensors(e, s, o, u)]
                      : [3, 4]
                  );
                case 3:
                  return (d = l.sent()), [2, [h, d]];
                case 4:
                  return [2, h];
                case 5:
                  return [3, 7];
                case 6:
                  return t.dispose([a, i, s, o, u]), [7];
                case 7:
                  return [2];
              }
            });
          });
        }),
        (r.prototype.fineTuningUsingTfDatasets = function (e, t, r) {
          return o(this, void 0, void 0, function () {
            var n, a, i;
            return l(this, function (s) {
              switch (s.label) {
                case 0:
                  return (
                    (n = this.secondLastBaseDenseLayer.trainable),
                    (this.secondLastBaseDenseLayer.trainable = !0),
                    (a =
                      null == e.fineTuningOptimizer
                        ? "sgd"
                        : e.fineTuningOptimizer),
                    this.model.compile({
                      loss: "categoricalCrossentropy",
                      optimizer: a,
                      metrics: ["acc"],
                    }),
                    [
                      4,
                      this.model.fitDataset(t, {
                        epochs: e.fineTuningEpochs,
                        validationData: r,
                        callbacks: null == e.callback ? null : [e.callback],
                      }),
                    ]
                  );
                case 1:
                  return (
                    (i = s.sent()),
                    (this.secondLastBaseDenseLayer.trainable = n),
                    [2, i]
                  );
              }
            });
          });
        }),
        (r.prototype.fineTuningUsingTensors = function (e, t, r, n) {
          return o(this, void 0, void 0, function () {
            var a, i, s;
            return l(this, function (o) {
              switch (o.label) {
                case 0:
                  return (
                    (a = this.secondLastBaseDenseLayer.trainable),
                    (this.secondLastBaseDenseLayer.trainable = !0),
                    (i =
                      null == e.fineTuningOptimizer
                        ? "sgd"
                        : e.fineTuningOptimizer),
                    this.model.compile({
                      loss: "categoricalCrossentropy",
                      optimizer: i,
                      metrics: ["acc"],
                    }),
                    [
                      4,
                      this.model.fit(t, r, {
                        epochs: e.fineTuningEpochs,
                        validationData: n,
                        batchSize: e.batchSize,
                        callbacks:
                          null == e.fineTuningCallback
                            ? null
                            : [e.fineTuningCallback],
                      }),
                    ]
                  );
                case 1:
                  return (
                    (s = o.sent()),
                    (this.secondLastBaseDenseLayer.trainable = a),
                    [2, s]
                  );
              }
            });
          });
        }),
        (r.prototype.evaluate = function (e) {
          return o(this, void 0, void 0, function () {
            var r,
              n = this;
            return l(this, function (a) {
              return (
                t.util.assert(
                  null != e.wordProbThresholds &&
                    e.wordProbThresholds.length > 0,
                  function () {
                    return "Received null or empty wordProbThresholds";
                  }
                ),
                (r = 0),
                t.util.assert(
                  "_background_noise_" === this.words[r],
                  function () {
                    return "Cannot perform evaluation when the first tag is not _background_noise_";
                  }
                ),
                [
                  2,
                  t.tidy(function () {
                    for (
                      var a = [],
                        i = 0,
                        s = n.collectTransferDataAsTensors(e.windowHopRatio),
                        o = s.xs,
                        l = s.ys.argMax(-1).dataSync(),
                        u = n.model.predict(o),
                        c = t.max(
                          t.slice(u, [0, 1], [u.shape[0], u.shape[1] - 1]),
                          -1
                        ),
                        h = u.shape[0],
                        d = 0;
                      d < e.wordProbThresholds.length;
                      ++d
                    ) {
                      for (
                        var p = e.wordProbThresholds[d],
                          f = c.greater(t.scalar(p)).dataSync(),
                          m = 0,
                          g = 0,
                          v = 0,
                          y = 0,
                          b = 0;
                        b < h;
                        ++b
                      )
                        l[b] === r ? (m++, f[b] && v++) : (g++, f[b] && y++);
                      var w = v / m,
                        x = y / g;
                      a.push({ probThreshold: p, fpr: w, tpr: x }),
                        console.log(
                          "ROC thresh=" +
                            p +
                            ": fpr=" +
                            w.toFixed(4) +
                            ", tpr=" +
                            x.toFixed(4)
                        ),
                        d > 0 &&
                          (i +=
                            (Math.abs(a[d - 1].fpr - a[d].fpr) *
                              (a[d - 1].tpr + a[d].tpr)) /
                            2);
                    }
                    return { rocCurve: a, auc: i };
                  }),
                ]
              );
            });
          });
        }),
        (r.prototype.createTransferModelFromBaseModel = function () {
          var e = this;
          t.util.assert(null != this.words, function () {
            return (
              "No word example is available for tranfer-learning model of name " +
              e.name
            );
          });
          for (
            var r = this.baseModel.layers, n = r.length - 2;
            n >= 0 && "dense" !== r[n].getClassName().toLowerCase();

          )
            n--;
          if (n < 0)
            throw new Error(
              "Cannot find a hidden dense layer in the base model."
            );
          this.secondLastBaseDenseLayer = r[n];
          var i = this.secondLastBaseDenseLayer.output;
          (this.transferHead = a.sequential()),
            this.transferHead.add(
              a.layers.dense({
                units: this.words.length,
                activation: "softmax",
                inputShape: i.shape.slice(1),
                name: "NewHeadDense",
              })
            );
          var s = this.transferHead.apply(i);
          this.model = a.model({ inputs: this.baseModel.inputs, outputs: s });
        }),
        (r.prototype.modelInputShape = function () {
          return this.baseModel.inputs[0].shape;
        }),
        (r.prototype.getMetadata = function () {
          return {
            tfjsSpeechCommandsVersion: A,
            modelName: this.name,
            timeStamp: new Date().toISOString(),
            wordLabels: this.wordLabels(),
          };
        }),
        (r.prototype.save = function (e) {
          return o(this, void 0, void 0, function () {
            var t, r, n;
            return l(this, function (a) {
              return (
                (t = null != e),
                (e = e || N(this.name)),
                t ||
                  ((r = k.localStorage.getItem(R)),
                  ((n = null == r ? {} : JSON.parse(r))[this.name] =
                    this.getMetadata()),
                  k.localStorage.setItem(R, JSON.stringify(n))),
                console.log("Saving model to " + e),
                [2, this.model.save(e)]
              );
            });
          });
        }),
        (r.prototype.load = function (e) {
          return o(this, void 0, void 0, function () {
            var t, r, n;
            return l(this, function (i) {
              switch (i.label) {
                case 0:
                  if (((t = null != e), (e = e || N(this.name)), !t)) {
                    if (
                      null == (r = JSON.parse(k.localStorage.getItem(R))) ||
                      null == r[this.name]
                    )
                      throw new Error(
                        "Cannot find metadata for transfer model named " +
                          this.name +
                          '"'
                      );
                    (this.words = r[this.name].wordLabels),
                      console.log(
                        "Loaded word list for model named " +
                          this.name +
                          ": " +
                          this.words
                      );
                  }
                  return (n = this), [4, a.loadLayersModel(e)];
                case 1:
                  return (
                    (n.model = i.sent()),
                    console.log("Loaded model from " + e + ":"),
                    this.model.summary(),
                    [2]
                  );
              }
            });
          });
        }),
        (r.prototype.createTransfer = function (e) {
          throw new Error(
            "Creating transfer-learned recognizer from a transfer-learned recognizer is not supported."
          );
        }),
        r
      );
    })(C);
  function N(e) {
    return "" + O + e;
  }
  var U = {
    concatenateFloat32Arrays: w,
    normalizeFloat32Array: f,
    normalize: p,
    playRawAudio: function (e, t) {
      var r = new (window.AudioContext || window.webkitAudioContext)(),
        n = r.createBuffer(1, e.data.length, e.sampleRateHz);
      n.getChannelData(0).set(e.data);
      var a = r.createBufferSource();
      (a.buffer = n),
        a.connect(r.destination),
        a.start(),
        (a.onended = function () {
          null != t && t();
        });
    },
  };
  (e.create = function (e, r, n, a) {
    if (
      (t.util.assert(
        (null == n && null == a) || (null != n && null != a),
        function () {
          return "customModelURL and customMetadataURL must be both provided or both not provided.";
        }
      ),
      null != n &&
        t.util.assert(null == r, function () {
          return "vocabulary name must be null or undefined when modelURL is provided.";
        }),
      "BROWSER_FFT" === e)
    )
      return new C(r, n, a);
    throw "SOFT_FFT" === e
      ? new Error(
          "SOFT_FFT SpeechCommandRecognizer has not been implemented yet."
        )
      : new Error("Invalid fftType: '" + e + "'");
  }),
    (e.utils = U),
    (e.BACKGROUND_NOISE_TAG = "_background_noise_"),
    (e.Dataset = F),
    (e.getMaxIntensityFrameIndex = L),
    (e.spectrogram2IntensityCurve = I),
    (e.deleteSavedTransferModel = function (e) {
      return o(this, void 0, void 0, function () {
        var r;
        return l(this, function (n) {
          switch (n.label) {
            case 0:
              return (
                null == (r = JSON.parse(k.localStorage.getItem(R))) && (r = {}),
                null != r[e] && delete r[e],
                k.localStorage.setItem(R, JSON.stringify(r)),
                [4, t.io.removeModel(N(e))]
              );
            case 1:
              return n.sent(), [2];
          }
        });
      });
    }),
    (e.listSavedTransferModels = function () {
      return o(this, void 0, void 0, function () {
        var e, r, n;
        return l(this, function (a) {
          switch (a.label) {
            case 0:
              return [4, t.io.listModels()];
            case 1:
              for (n in ((e = a.sent()), (r = []), e))
                n.startsWith(O) && r.push(n.slice(O.length));
              return [2, r];
          }
        });
      });
    }),
    (e.UNKNOWN_TAG = "_unknown_"),
    (e.version = A),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
