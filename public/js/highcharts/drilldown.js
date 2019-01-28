/*
 Highcharts JS v7.0.2 (2019-01-17)
 Highcharts Drilldown module

 Author: Torstein Honsi
 License: www.highcharts.com/license

*/
(function (l) {
    "object" === typeof module && module.exports ? (l["default"] = l, module.exports = l) : "function" === typeof define && define.amd ? define(function () {
        return l
    }) : l("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (l) {
    (function (e) {
        var l = e.animObject,
            w = e.noop,
            x = e.color,
            y = e.defaultOptions,
            r = e.extend,
            D = e.format,
            z = e.objectEach,
            t = e.pick,
            n = e.Chart,
            p = e.seriesTypes,
            A = p.pie,
            p = p.column,
            B = e.Tick,
            u = e.fireEvent,
            C = 1;
        r(y.lang, {
            drillUpText: "\u25c1 Back to {series.name}"
        });
        y.drilldown = {
            activeAxisLabelStyle: {
                cursor: "pointer",
                color: "#003399",
                fontWeight: "bold",
                textDecoration: "underline"
            },
            activeDataLabelStyle: {
                cursor: "pointer",
                color: "#003399",
                fontWeight: "bold",
                textDecoration: "underline"
            },
            animation: {
                duration: 500
            },
            drillUpButton: {
                position: {
                    align: "right",
                    x: -10,
                    y: 10
                }
            }
        };
        e.SVGRenderer.prototype.Element.prototype.fadeIn = function (a) {
            this.attr({
                opacity: .1,
                visibility: "inherit"
            }).animate({
                opacity: t(this.newOpacity, 1)
            }, a || {
                duration: 250
            })
        };
        n.prototype.addSeriesAsDrilldown = function (a, b) {
            this.addSingleSeriesAsDrilldown(a, b);
            this.applyDrilldown()
        };
        n.prototype.addSingleSeriesAsDrilldown = function (a, b) {
            var c = a.series,
                d = c.xAxis,
                f = c.yAxis,
                h, g = [],
                m = [],
                k, q, l;
            l = this.styledMode ? {
                colorIndex: t(a.colorIndex, c.colorIndex)
            } : {
                color: a.color || c.color
            };
            this.drilldownLevels || (this.drilldownLevels = []);
            k = c.options._levelNumber || 0;
            (q = this.drilldownLevels[this.drilldownLevels.length - 1]) && q.levelNumber !== k && (q = void 0);
            b = r(r({
                _ddSeriesId: C++
            }, l), b);
            h = c.points.indexOf(a);
            c.chart.series.forEach(function (a) {
                a.xAxis !== d || a.isDrilling || (a.options._ddSeriesId = a.options._ddSeriesId ||
                    C++, a.options._colorIndex = a.userOptions._colorIndex, a.options._levelNumber = a.options._levelNumber || k, q ? (g = q.levelSeries, m = q.levelSeriesOptions) : (g.push(a), m.push(a.options)))
            });
            a = r({
                levelNumber: k,
                seriesOptions: c.options,
                levelSeriesOptions: m,
                levelSeries: g,
                shapeArgs: a.shapeArgs,
                bBox: a.graphic ? a.graphic.getBBox() : {},
                color: a.isNull ? (new e.Color(x)).setOpacity(0).get() : x,
                lowerSeriesOptions: b,
                pointOptions: c.options.data[h],
                pointIndex: h,
                oldExtremes: {
                    xMin: d && d.userMin,
                    xMax: d && d.userMax,
                    yMin: f && f.userMin,
                    yMax: f && f.userMax
                },
                resetZoomButton: this.resetZoomButton
            }, l);
            this.drilldownLevels.push(a);
            d && d.names && (d.names.length = 0);
            b = a.lowerSeries = this.addSeries(b, !1);
            b.options._levelNumber = k + 1;
            d && (d.oldPos = d.pos, d.userMin = d.userMax = null, f.userMin = f.userMax = null);
            c.type === b.type && (b.animate = b.animateDrilldown || w, b.options.animation = !0)
        };
        n.prototype.applyDrilldown = function () {
            var a = this.drilldownLevels,
                b;
            a && 0 < a.length && (b = a[a.length - 1].levelNumber, this.drilldownLevels.forEach(function (a) {
                a.levelNumber === b && a.levelSeries.forEach(function (a) {
                    a.options &&
                        a.options._levelNumber === b && a.remove(!1)
                })
            }));
            this.resetZoomButton && (this.resetZoomButton.hide(), delete this.resetZoomButton);
            this.pointer.reset();
            this.redraw();
            this.showDrillUpButton()
        };
        n.prototype.getDrilldownBackText = function () {
            var a = this.drilldownLevels;
            if (a && 0 < a.length) return a = a[a.length - 1], a.series = a.seriesOptions, D(this.options.lang.drillUpText, a)
        };
        n.prototype.showDrillUpButton = function () {
            var a = this,
                b = this.getDrilldownBackText(),
                c = a.options.drilldown.drillUpButton,
                d, f;
            this.drillUpButton ? this.drillUpButton.attr({
                    text: b
                }).align() :
                (f = (d = c.theme) && d.states, this.drillUpButton = this.renderer.button(b, null, null, function () {
                    a.drillUp()
                }, d, f && f.hover, f && f.select).addClass("highcharts-drillup-button").attr({
                    align: c.position.align,
                    zIndex: 7
                }).add().align(c.position, !1, c.relativeTo || "plotBox"))
        };
        n.prototype.drillUp = function () {
            if (this.drilldownLevels && 0 !== this.drilldownLevels.length) {
                for (var a = this, b = a.drilldownLevels, c = b[b.length - 1].levelNumber, d = b.length, f = a.series, h, g, e, k, q = function (b) {
                        var c;
                        f.forEach(function (a) {
                            a.options._ddSeriesId ===
                                b._ddSeriesId && (c = a)
                        });
                        c = c || a.addSeries(b, !1);
                        c.type === e.type && c.animateDrillupTo && (c.animate = c.animateDrillupTo);
                        b === g.seriesOptions && (k = c)
                    }; d--;)
                    if (g = b[d], g.levelNumber === c) {
                        b.pop();
                        e = g.lowerSeries;
                        if (!e.chart)
                            for (h = f.length; h--;)
                                if (f[h].options.id === g.lowerSeriesOptions.id && f[h].options._levelNumber === c + 1) {
                                    e = f[h];
                                    break
                                } e.xData = [];
                        g.levelSeriesOptions.forEach(q);
                        u(a, "drillup", {
                            seriesOptions: g.seriesOptions
                        });
                        k.type === e.type && (k.drilldownLevel = g, k.options.animation = a.options.drilldown.animation,
                            e.animateDrillupFrom && e.chart && e.animateDrillupFrom(g));
                        k.options._levelNumber = c;
                        e.remove(!1);
                        k.xAxis && (h = g.oldExtremes, k.xAxis.setExtremes(h.xMin, h.xMax, !1), k.yAxis.setExtremes(h.yMin, h.yMax, !1));
                        g.resetZoomButton && (a.resetZoomButton = g.resetZoomButton, a.resetZoomButton.show())
                    } u(a, "drillupall");
                this.redraw();
                0 === this.drilldownLevels.length ? this.drillUpButton = this.drillUpButton.destroy() : this.drillUpButton.attr({
                    text: this.getDrilldownBackText()
                }).align();
                this.ddDupes.length = []
            }
        };
        n.prototype.callbacks.push(function () {
            var a =
                this;
            a.drilldown = {
                update: function (b, c) {
                    e.merge(!0, a.options.drilldown, b);
                    t(c, !0) && a.redraw()
                }
            }
        });
        e.addEvent(n, "beforeShowResetZoom", function () {
            if (this.drillUpButton) return !1
        });
        e.addEvent(n, "render", function () {
            (this.xAxis || []).forEach(function (a) {
                a.ddPoints = {};
                a.series.forEach(function (b) {
                    var c, d = b.xData || [],
                        f = b.points,
                        h;
                    for (c = 0; c < d.length; c++) h = b.options.data[c], "number" !== typeof h && (h = b.pointClass.prototype.optionsToObject.call({
                        series: b
                    }, h), h.drilldown && (a.ddPoints[d[c]] || (a.ddPoints[d[c]] = []),
                        a.ddPoints[d[c]].push(f ? f[c] : !0)))
                });
                z(a.ticks, B.prototype.drillable)
            })
        });
        p.prototype.animateDrillupTo = function (a) {
            if (!a) {
                var b = this,
                    c = b.drilldownLevel;
                this.points.forEach(function (a) {
                    var b = a.dataLabel;
                    a.graphic && a.graphic.hide();
                    b && (b.hidden = "hidden" === b.attr("visibility"), b.hidden || (b.hide(), a.connector && a.connector.hide()))
                });
                e.syncTimeout(function () {
                    b.points && b.points.forEach(function (a, b) {
                        b = b === (c && c.pointIndex) ? "show" : "fadeIn";
                        var d = "show" === b ? !0 : void 0,
                            f = a.dataLabel;
                        if (a.graphic) a.graphic[b](d);
                        f && !f.hidden && (f.fadeIn(), a.connector && a.connector.fadeIn())
                    })
                }, Math.max(this.chart.options.drilldown.animation.duration - 50, 0));
                this.animate = w
            }
        };
        p.prototype.animateDrilldown = function (a) {
            var b = this,
                c = this.chart,
                d = c.drilldownLevels,
                f, e = l(c.options.drilldown.animation),
                g = this.xAxis,
                m = c.styledMode;
            a || (d.forEach(function (a) {
                b.options._ddSeriesId === a.lowerSeriesOptions._ddSeriesId && (f = a.shapeArgs, m || (f.fill = a.color))
            }), f.x += t(g.oldPos, g.pos) - g.pos, this.points.forEach(function (a) {
                var c = a.shapeArgs;
                m || (c.fill =
                    a.color);
                a.graphic && a.graphic.attr(f).animate(r(a.shapeArgs, {
                    fill: a.color || b.color
                }), e);
                a.dataLabel && a.dataLabel.fadeIn(e)
            }), this.animate = null)
        };
        p.prototype.animateDrillupFrom = function (a) {
            var b = l(this.chart.options.drilldown.animation),
                c = this.group,
                d = c !== this.chart.columnGroup,
                f = this;
            f.trackerGroups.forEach(function (a) {
                if (f[a]) f[a].on("mouseover")
            });
            d && delete this.group;
            this.points.forEach(function (h) {
                var g = h.graphic,
                    m = a.shapeArgs,
                    k = function () {
                        g.destroy();
                        c && d && (c = c.destroy())
                    };
                g && (delete h.graphic,
                    f.chart.styledMode || (m.fill = a.color), b.duration ? g.animate(m, e.merge(b, {
                        complete: k
                    })) : (g.attr(m), k()))
            })
        };
        A && r(A.prototype, {
            animateDrillupTo: p.prototype.animateDrillupTo,
            animateDrillupFrom: p.prototype.animateDrillupFrom,
            animateDrilldown: function (a) {
                var b = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    c = this.chart.options.drilldown.animation,
                    d = b.shapeArgs,
                    f = d.start,
                    h = (d.end - f) / this.points.length,
                    g = this.chart.styledMode;
                a || (this.points.forEach(function (a, k) {
                    var m = a.shapeArgs;
                    g || (d.fill =
                        b.color, m.fill = a.color);
                    if (a.graphic) a.graphic.attr(e.merge(d, {
                        start: f + k * h,
                        end: f + (k + 1) * h
                    }))[c ? "animate" : "attr"](m, c)
                }), this.animate = null)
            }
        });
        e.Point.prototype.doDrilldown = function (a, b, c) {
            var d = this.series.chart,
                f = d.options.drilldown,
                e = (f.series || []).length,
                g;
            d.ddDupes || (d.ddDupes = []);
            for (; e-- && !g;) f.series[e].id === this.drilldown && -1 === d.ddDupes.indexOf(this.drilldown) && (g = f.series[e], d.ddDupes.push(this.drilldown));
            u(d, "drilldown", {
                point: this,
                seriesOptions: g,
                category: b,
                originalEvent: c,
                points: void 0 !==
                    b && this.series.xAxis.getDDPoints(b).slice(0)
            }, function (b) {
                var c = b.point.series && b.point.series.chart,
                    d = b.seriesOptions;
                c && d && (a ? c.addSingleSeriesAsDrilldown(b.point, d) : c.addSeriesAsDrilldown(b.point, d))
            })
        };
        e.Axis.prototype.drilldownCategory = function (a, b) {
            z(this.getDDPoints(a), function (c) {
                c && c.series && c.series.visible && c.doDrilldown && c.doDrilldown(!0, a, b)
            });
            this.chart.applyDrilldown()
        };
        e.Axis.prototype.getDDPoints = function (a) {
            return this.ddPoints && this.ddPoints[a]
        };
        B.prototype.drillable = function () {
            var a =
                this.pos,
                b = this.label,
                c = this.axis,
                d = "xAxis" === c.coll && c.getDDPoints,
                f = d && c.getDDPoints(a),
                h = c.chart.styledMode;
            d && (b && f && f.length ? (b.drillable = !0, b.basicStyles || h || (b.basicStyles = e.merge(b.styles)), b.addClass("highcharts-drilldown-axis-label").on("click", function (b) {
                c.drilldownCategory(a, b)
            }), h || b.css(c.chart.options.drilldown.activeAxisLabelStyle)) : b && b.drillable && (h || (b.styles = {}, b.css(b.basicStyles)), b.on("click", null), b.removeClass("highcharts-drilldown-axis-label")))
        };
        e.addEvent(e.Point, "afterInit",
            function () {
                var a = this,
                    b = a.series;
                a.drilldown && e.addEvent(a, "click", function (c) {
                    b.xAxis && !1 === b.chart.options.drilldown.allowPointDrilldown ? b.xAxis.drilldownCategory(a.x, c) : a.doDrilldown(void 0, void 0, c)
                });
                return a
            });
        e.addEvent(e.Series, "afterDrawDataLabels", function () {
            var a = this.chart.options.drilldown.activeDataLabelStyle,
                b = this.chart.renderer,
                c = this.chart.styledMode;
            this.points.forEach(function (d) {
                var f = d.options.dataLabels,
                    e = t(d.dlOptions, f && f.style, {});
                d.drilldown && d.dataLabel && ("contrast" !==
                    a.color || c || (e.color = b.getContrast(d.color || this.color)), f && f.color && (e.color = f.color), d.dataLabel.addClass("highcharts-drilldown-data-label"), c || d.dataLabel.css(a).css(e))
            }, this)
        });
        var v = function (a, b, c, d) {
            a[c ? "addClass" : "removeClass"]("highcharts-drilldown-point");
            d || a.css({
                cursor: b
            })
        };
        e.addEvent(e.Series, "afterDrawTracker", function () {
            var a = this.chart.styledMode;
            this.points.forEach(function (b) {
                b.drilldown && b.graphic && v(b.graphic, "pointer", !0, a)
            })
        });
        e.addEvent(e.Point, "afterSetState", function () {
            var a =
                this.series.chart.styledMode;
            this.drilldown && this.series.halo && "hover" === this.state ? v(this.series.halo, "pointer", !0, a) : this.series.halo && v(this.series.halo, "auto", !1, a)
        })
    })(l)
});
//# sourceMappingURL=drilldown.js.map