let dropArea = document.getElementById("drop-area");
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});
function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}
["dragenter", "dragover"].forEach((eventName) => {
  dropArea.addEventListener(eventName, highlight, false);
});
["dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
  dropArea.classList.add("highlight");
}

function unhighlight(e) {
  dropArea.classList.remove("highlight");
}

dropArea.addEventListener("drop", handleDrop, false);

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;
  /* let out = document.getElementById("output");
    out.setAttribute("src", files[0].name); */
  console.log(files);
  openFile(e, files[0]);
}

function down() {
  var svgElement = document.getElementById("svgbox");
  let { width, height } = svgElement.getBBox();
  let clonedSvgElement = svgElement.cloneNode(true);
  let outerHTML = clonedSvgElement.outerHTML,
    blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });
  let URL = window.URL || window.webkitURL || window;
  let blobURL = URL.createObjectURL(blob);

  let image = new Image();
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d"); // draw image in canvas starting left-0 , top - 0
  image.onload = () => {
    canvas.widht = width;
    canvas.height = height;
    context.drawImage(image, 0, 0, width, height); //  downloadImage(canvas); need to implement
  };
  image.src = blobURL;
  let png = canvas.toDataURL();

  downloadI(png, "image.png");
}
var downloadI = function (href, name) {
  var link = document.createElement("a");
  link.download = name;
  link.style.opacity = "0";
  document.getElementById("download").appendChild(link);
  link.href = href;
  link.click();
};

var fore = "";
var mask = `iVBORw0KGgoAAAANSUhEUgAAAgwAAAHCCAIAAAAM7gYBAAAobElEQVR4nO3dWXPb2Lm2YY4gCIEAwVni0LQsu+XYXdWuHOT//4DsdNId2+32IEvWxHkyCc7fwfqMzU1ZHiSCxHBfB6kkraQAFsgH73rXEAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXhHc9QUAjhAMBkOfBYPr34vlcrn4bLlcfvHvb/4N4AGEBHzn5u97
                    MBgMh8OSJMmyLElSOBxezYnlcjmfzyeTiWmak8lkPp8HAoG1vw8EAmt/s1hBZsC9CAl432oqhEKhm3kQCoUkSVJVNZlMqqoqSVIoFLL+54vFYjKZDAaDTqczGAwmk0kgEFj7+0AgsPo34/F4Op2KzBD/XsQGaQHXISTgWeLXPxwOR6PRWCwmUkH8+7U8CIVCsizrup7NZnVdl2V5LS
                    RM0+x2u/V6vdvtmqYZCATW/j4QCKz+zXA4NE1zMBi02+1utzsYDIbDIWkBNyIk4DVr2aAoiqqquq4bhqGqqizLiqKs5cHGKwnTNIfDYbfbrdVqtVqt0Wg0m81ut9vv90V+iLQgKuB8hAQ84rZsSKfTmUwml8vlcjld1xVFkWV5LQ823pOYTqfj8XgwGLRarUajUavVrq+va7VavV6v1
                    +vNZrPX6w2HQ6ICzkdIwPXET3w0GhVVQiKRWM2GfD6fy+UymUwqlVJVNRaLRaPRm3mw2dlNi8VCZMZwOBwMBt1ut9lsNhqN6+vrjx8/np2dnZ+f1+t1ogLOR0jAxax4UBRF07R0Op3NZrPZ7Go2pNNpXddVVVUURaTCahP7Zh5sisiM+XwuqgqRFu12+/Ly8uzs7P3796enp0QFnI+Qg
                    CutxUM2my0Wi+VyuVQq5fP5tWwQ1YOIB/tS4TaraSGa241G4/z8/PT0dDUqOp2OiIrFYrHlKwS+gpCAm6w2HsT8okwmUywWK5XKgwcPyuXy/v6+aFDvPBtuEr2N6XQ6HA57vV69XhdR8e7du5OTkw8fPlxdXfV6vfF4TE7AOSK7vgDgu9xsPBiGsb+/Xy6XHzx4UKlUisViJpMRE5Ycl
                    Q2WYDAYiURuFkClUqlYLBqG8eeff56dnXU6nfF4zNATHIKQgNPd1njI5/OlUqlcLheLxWw2q2maoigiHhyVDWtuRkUqlUqn05qmxeNxWZbPzs5arRZDT3AIQgLO9fXGg4gK8fPqinhYtRoVsiyLeIjH44lEIplMnpycXF9fi6EnSgrsFiEBJ/piPKw1HhKJhFj04K54WCWiQsyzikQi8
                    Xg8mUxms9lUKvXmzZvz83NKCuwcIQFn+Uo8uKLxcAehUCgWiyWTSbGK2zCMdDqdTqdfv359cnJCNxu7RUjAQUKhkIgH8UK9Fg8uajz8KLEviFjFbTUqstlsMpl89erV6emp6GaTE9g+QgKOIAqIWCymaVo+n69UKtVq9fDw0PPxYLGGniKRiCzLojlhbRxycnJCTmAnCAnsnlVApFKpYrF4dHR0fHx8eHhYLpf9EA+rVksKWZZjsZh11+QEdoKQwI6JEXlN0wqFQrVaffz48fHx8dHR0cHBgWEY/okHy2o3e3Uz2gA5gV0gJLBLVs+2UqkcHx8/ffr00aNH1Wo1n89rmrb6Hu031idTrVZX/3tyAltGSGBnVn8Hnz179vz58ydPnpTL5VQqJQqItfdovyEn4ASEBHZj9Rfwl19++fvf//7LL79UKpVkMunnAmLNzZywNiTvdDqTyYR1drAbIYEd+GJCVKtVkRA+LyDWrOXE2vFHs9ls1xcIjyMksG0kxI9a7dyIA++sg1RFVbHrC4SXERLYKhLibqzPrVwudzqder3ebreHw+FsNmPQCbYiJLA9wWAwGo1qmlapVJ49e0ZC/BCRE6lUqlqttlotcVC2aZoMOsFWhAS2JxwOK4pSKBSOj4+fP39OQvwo8QHm8/mjoyNxaHa32xU5QTEBm/DNxJasvgg/ffr0yZMn1lwmEuI7WaXYwcHB4eFhtVrNZrOKooTD4V1fGjyLLye2wfp1KxaLjx8/fvToUblc
                    JiHuQGStYRjlcvnw8LBYLGqaFo1GmTEMm/D9xDasjpMcHx9Xq9VUKkVC3I34MDOZTLlcLpfL6XRalmU+SdiEBwu2Wx1oEvsy5fN5BknuTJRluq7v7++XSiVGnGArQgL2Wh1oevTo0aNHjxghub9wOCzLsmEYhUIhn8/ruk5ZBpvwVMFeDDTZwYrefD4vTvxOJBLkLuzAFFjYSPyWWZu8MtC0QeFweG9vr1AoPHz48PLyst1uj0Yj1kxg4wgJ
                    2EiUEdlsVhwzd3BwwEDTpoRCIVmWs9ns4eFhvV6v1+usmYAdKPlhl9XJmg8fPiyXy4ZhMNC0KWtrJn766SemOcEOPE+wBcu+tsDa0Gl/f79YLKbT6Xg8Tkhgs3ieYIu1frVYXM1A08aJaU66rqfTaV3XZVkmhrFZhAQ2j3711ogDsePxuKZpmqbF4/FIJEISY4MICWye6Kmm0+mffvqJfrXdRDGhaZphGIlEQpIkRpywQTxM2DxrUlO5XD44OKBfbSsRyclkMpvNJpNJetfYLB4mbJgYa0okEtlsNp/PG4bBQLmtQqGQJEmJRMIwDE3T+LSxWYQENkxMudF1PZfLZTIZVVUZaLIVbQnYipDAhomxpnQ6nc/n0+k0/eotoC0B+/AkYZPEWJOqqplMJpfLsfHcdtCWgH14krBJjDXthGhLqKqq67qqqlQS2CCeJGySeKU1DCOXy6VSKcaatiMYDIbDYUmSZFmWJCkcDhPM2BRCApvEK+2uBIPB0GckBDaILzA2iVfaHSInYAdCAhvGT9VOEM+wCSEBeAEDfbAJjxHgBcyChU14jAAvoJKATXiMsGHL5XLxGedobg09CdiEkMAmLZfL+Xw+mUxM05xMJpy3vE1MGYAdCAls0mKxmEwmg8Gg2+0OBoPJZLJYLHZ9UQDujpDAJi0WC9M02+12rVZrtVrD4XA+n+/6ogDcHSGBTVosFuPxuNvt1mq1RqMxGAym0ykjToB7ERLYpOVyOZ1OB4NBo9Go1Wrdbnc
                    8HjPiBLgXIYENm8/nw+Gw2WxeX183m01GnABXIySwYYw4AV5CSGDDGHECvISQwOYx4gR4BiGBzWPEaSdY6w47EBLYPEacto+17rAJIQFbiBGnVqtVq9Xa7bZpmoSErVjrDpsQErCF+M3q9/vtdrvX65mmSVvCVmKte6fTqdfrnU6HVMamEBKwxXK5nM1mo9Go1+v1er3RaDSbzRgAsQ+VBGxCSMAu8/ncNM1er9dut/v9Pj9btqInAZsQErALAyBbxuwm2IGQgF0YAAE8gJCAXRgAATyAkICNRE7MZrPZbEZIAG5ESMBGFBOA2xESsBFtCcDtCAnYiAlOgNsRErARlQTgdoQEbERPAnA7QgL2YoIT4GqEBOxFMQG4GiEBe9GWAFyNkIC9mOC0NcFgMPRZMBjc9eXAIwgJ2ItKYjuCwWA4HJYkSZZlSZLC4TA5gY0gJGAv0ZMYj8fD4dA0zel0SkjYIRQKSZKkqqqu66qqSpIUCvHtxgbwGMF2i8ViOp2apjkcDsfjMb1rO4RCIVmWk8lkNptNJpOyLBMS2AgeI9iOEactoJKATXiMYDt611sgehKxWExRFFmWo9EoIYGN4DGC7UQl0e/32+12r9czTXM+n+/6ojwoFApFo1FZlhVFicVi9K6xEYQEbLdcLmez2Wg06vV6vV5vNBrNZjPaEhvHiBPswDOEbZjP56Zp9nq9drvd7/dpS9iB3jXswDOEbaAtsQVUErADzxC2gQlOW0DvGnbgGcI2sM3fdtC7xsYREtiS5XK5+IyEsAkjTtg4HiDAO+hdY+N4gADvEJVEIpEwDEPTNFmWw+Hwri8K7kZIAN4RDAYjkUg8Htc0TdO0eDw
                    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
                    KBQODw8fPXrECQo/ajUwZFlOJBLiV351J4/VzLAa3QQGCAk4VDAYDIVC4XA4FoslEolCofDo0aNnz54dHR3lcjnOYrsbKy3EfxQVxs3MsNoY3x8Y9L29isY1HEf8kIl3XkVRdF3P5/MPHz4UrYiHDx/mcrm9vb1IhFecDbP2kbXaGN8ZGMyV8jBCAk5hlQ4iHnRdT6VS2Ww2n8+XSq
                    WHDx8+fPiwVCqlUilFUfy5nd82/VBgfHOulLU1iPV/S3K4BV8z7N5a6SC27RMLqkulUqFQyOfzhUIhm81qmhaLxXx1CJ0TfDMwvj5XytqVVszNXUsOYsPh+KZhl6x4UBRF07R0Op3NZq3qoVQq7e/vi31e9/b2ZFmORqM0q3fri4Hx9blS1q60i8ViMpmsJsd8Pl+NDTrhDkRIYGfEtCVFUcTpcsVisVwui+2YRFSkUild10U2hMPhUChEAeEoq0XAV+ZKrZ5vYZrmanKImGFxhpPxlcO2rU1byuVylUqlWq0eHh6Wy2VROiQSCUVRrHggG1zhK5khRpZuVhKz2cyKDebaOhPfPWzPF6ctHR4e/vzzzyIhMpkMpYNn3Gw23OxJiP/4/Ysz2MV2+/gGwnbfnLZ0eHh4cHBgGIaiKJQO3raWHKux8c25tmIX236/L7riIi2ICrvxVYRdVrMhFospiiK2hWDaElZ9/1xbsTVhvV6v1+vNZrPT6QyHw+l0uuCIVjvxhcSGfTEbdF1Pp9OZTIZpS/iKrweG2MX2+vr67Ozsw4cPp6en19fXvV6PI1ptRUhgA0QwiGyIRCKSJK1lgzhnNJfLMW0J3+lmYIhdbNvt9sXFxbt37169evXmzZvz8/NWq0VJYR++mbi7taJBlmVZlsVeQKlUajUbMplMOp3WdZ1pS7gDERjWIRkiJ968efPq1au//vrr5OSEksI+7H6DH3bb
                    gJIYPtI0TexHvZoNqqoqihKLxSgdcAeru9iK15G9vT1N08QMiFQqRUlhH0IC3+vrzQaRCqs5QTZg48TJIqFQKBKJiD3PU6lUOp1Op9OvX78+OTm5uroSJQU5sSmEBL7hm9lgDSilUqlEIhGPx8W4E9kAm4RCIUmSxNF7YkMXUVIkk8lXr16dnp52Oh1yYlMICXzZ92fD6oCSJEni4EzRxyYbYJObJUUymVRVVZKkUCh0cnJCTmwKIYH/427ZQNGAnVgtKUTxas2Gs
                    OoJWtn3REjg/7u5XzfZAOezSgoh8PlJjsViZ2dntLLvj5DArft1kw1wi1AoFIvFkslktVoV5YWogGll3x8h4Wtr8bC2XzfZABexciIUCsmyLPafp5V9f4SET30xHiqVyoMHD6z9uskGuIuVE1YlQSv7/ggJH1nbPEOWZU3TMpmMFQ+VSqVYLLJfN9zrK61scuJuCAnvu23zDF3XC4VCuVy24kHsxsp+3XC1m61sCzlxB4SEl31xwpK1KDqdTh8cHJTLZeIB3rPayl7978mJH0VIeNNXJixZm2eIGa7pdJp4gCfdzAlrZ9lOpzOZTFg/8T0ICa/55oSl1c0zxL8SD/CqtZxYOzx1Npvt+gJdgJDwlFAoJOJBzP+7bcISm2fAP6ycqFQq4/FYnKc9GAwmk4moKnZ9gU5HSHiEtcpU07R8Pl+pVKrV6uHhIROWACsnyuVyt9ut1+vdbtc0zcViQXPimwgJL7AKiFQqVSwWj46Ojo+PDw8Py+UyHWkg8DknUqlUtVrtdDr9ft80zdlsRnPimwgJ1xNPv6ZphUKhWq0+fvz4+Pj46Ojo4ODAMAziARDC4bCiKIVC4eeffx59RnPimwgJd1sdbz0+Pn769OmjR4+q1Wo+n9c0bXUlEeBzwWAwGo1qmlYul03T7Pf7NCe+ByHhYqszN549e/b8+fMnT56Uy+VUKiUKiLWVRIDPrTYnOp1OvV5vt9vD4XA2mzHodBtCwpWsNrWoIX755Ze///3vv/zyS6VSSSaTFBDAbVabE61Wq9ls9no90zQZdLoNIeE+q23qcrn85MmT58+fP3v2rFqtioSggAC+QjQn8vn80dFRs9lsNBpishPHE30RIeEyN9vUT58+PT4+tmoIEgL4Oqs5cXBwcHh4eHZ2dnFxIaY5zefzXV+d4xASbnKzTf348eNqtVooFESbmoQAvof4KhmGIbYve/PmzeXl5adPnwiJmwgJ16BNDWxQOByWZdkwjHw+n81mE4lEp9OZTqeMOK0hJNxhNSFoUwP3JwadEolENpvN5/OGYdTr9fF4TPt6De+eLvDFhKhWq6lUKh6PRyIREgK4A9HBzmazpVJpf39f1/VoNMq3aQ0h4XRWk61SqTx79sxKCNrUwD2J07BTqVSpVCqVSqlUSpZlvlNr+DicztpL4Pj4+Pnz5yQEsCnWG1ihUDg4OEin0/F4nK/VGj4OR1td+PP06dMnT54w1RXYING+FgdwiZ2Sw+Hwri/KWfihcS7rNadYLD5+/PjRo0flcpmEADZIHIgdj8fFmb40+W7it8a5VteFHh8fi041CQFsligmNE0zDCORSEiSxFdsFZ+FQ4kywlo3d3R0lM/nFUWhFgY2S7SvDcPI5XJi1RHfslWEhEOJBzedTv/000+Hh4cHBweapjE/D9g40fnTdT2Xy2UyGVVV+aKtIiQcyprBXS6XxfFBDDQBdhBVu6qqmUwml8vpus53bRUfhBPdXAvKpAvAPuKdLJVK5XI58XUjJCx8EE5E/QtsUygUkiQpkUgYhqFpGu9kqwgJJ6KTBmwTE2G/gpBwIvFeo6qqruuqqjInD7AbE2Fvw6fgROLsOVmWFUVhk1dgC0T5nkwms9lsMpmkLWHhU3Ac6/xqRVFkWeagCGALKN9vw6fgODyswPbxcnYbPgXHoewFdoJh3i/i18dxqCSAneCr90V8BI7D6wywExTxX8RH4CwMjAK7wpK6
                    L+IHyFkoeIFdYUndF/ED5CwUvMAOsaTuJr/fv9NQSQA7xFvaTX6/f6cRPQlJkmRZliSJrjWwTbyl3eT3+3egYDAY+oyEALaJmSM3+f3+AWAVc9DXEBLOQhkB7BYjTmt8ffNOQ0MC2DlOc1lDSDgIrzDAznEu5Bp+gxyE6XfAzokT5lVVzWQyuVxO1/VYLObnb6J/79yBqCQAJwiHw4qipFKpXC5nGIbPX9f8e+cORE8CcAJe11b5986didlNwM6xWmKVf+8cAG7DagkLIQEA6xhxsvj0tgHgK5hqaPHpbTsTDQnAIagkLD69bQdiahPgHPSuLT69bQfizQVwFHrXAj9DTsEYKOAovLcJfrxnZ+KJBByF9zbBj/fsTPQkAEfhvU3w4z07FrObAOegdy348Z4B4HvQuw4QEgBwG0acAoQEANyG3nWAkACA24hKIpFIGIahaZosyz48ypSQAIAvCwaDkUgkHo9rmqZpWjwej0QifmtLEBIAcKtwOCzLsqZphmEkEgkftiX8dbcA8ENoS/jrbgHghzDByV93CwA/hCV1/rpbAPhRPl9SR0gAwNf4fMTJR7cKAHfg8961j24VAO7A50vqCAkA+BqfL6kjJADgG/y8pM4v9wkAdybaEoZh5HK5VCqlKIp/RpwICQD4hlAoFIvFdF3P5XKZTEZV1Wg06pMRJ0ICAL4hGAxGo1FVVTOZTC6X03U9Fov5ZMTJFzcJAPcUDocVRUmn0/l8Pp1O+2fEiZAAgG/z7YgTIQEA3+bbESfv3yEAbIQYcUqlUrlczjAMnyy99v4dAsBG+HPpNSEBAN/Fn0uvCQkA+F4+XHrt8dtzkWAwGPrM8+8mgEv5cEdYj9+eW4jTryRJkmVZkiS/nWoCuIUP2xKEhCP4/FQTwC182Jbgl8gRfFjDAi7lt7aEl+/NRagkALfw2yudl+/NRehJAG7ht1c6L9+buzC7CXAF8UoXi8UURZFlORqNEhIAgP8VCoWi0agsy4qixGIxb5f+hAQA/BhfjTh59sYAwCa+6l179sYAwCa+WlJHSADAj/HVkjpCAgB+mH+W1HnzrgDAVqItYRhGLpdLpVIePvKakACAH+afI68JCQD4Yf458tqDtwQAW+CTI689eEsAsAU+mQhLSADAXfhkIiwhAQB35IeJsF67HwDYGj/sz+G1+wGArfFDW4KQAIA78kNbgpAAgLvzfFvCUzcDAFvm+baEp24GALbM820JQgIA7s7zbQlCAgDuxdttCe/cCQDshLfbEt65EwDYCdGWUFVV13VVVakkAAD/KxgMhsPhWCymKIosy9FolJAAAPyvUCgUjUZlWVYUJRaLhcNhz/SuCQkAuC8Pjzh55DYAYIc83Lv2yG0AwA55eEkdIQEA9+XhJXWEBABsgFeX1Hnh
                    HgBg57zalvDCPQDAznl1gpMX7gEAds6rS+q8cA8A4ASeXFJHSADAZnhyxMn1NwAADiF614Zh5HK5VCqlKIoHVksQEgCwGaFQKBaL6bqey+UymYyqqtFo1O0jToQEAGxGMBiMRqOqqmYymVwup+t6LBZz+4iTu68eABwlHA4ripJOp/P5fDqd9sCIEyEBABvjvREnQgIANsZ7I04uvnQAcCCPjTgREgCwSR4bcSIkAGCTPDbi5NbrBgDHEiNOqVQql8sZhuHqHWHdet0A4FheOqiOkACADfPSQXWEBABsnmcOqnPlRQOAw3nmoDpXXjQAOJxntg135UUDgMN55qA6V140ADifNw6qIyQAwBbeGHFy3xUDgCt4o3ftvisGAFfwxpI6QgIAbOGNJXWEBADYxQNL6lx2uQDgIh5oS7jscgHARTzQliAkAMAuHmhL
                    EBIAYCO3tyXcdK0A4Dpub0u46VoBwHXc3pYgJADARm5vSxASAGAvV7clXHOhAOBSrm5LuOZCAcClXL0drGsuFABcShxAJEmSLMuSJLnrYAlCAgBwK0LCKZbL5eKz5XK568sBsDGLxWI6nZqmORqNxuPxfD530XeckHCE5XI5n88nk4lpmpPJxF3PEICvWCwW4/G41+vVarXr6+tOpzMejxeLxa6v63sREo6wWCwmk0m/32+3271ezzTN+Xy+64sCcF8iITqdzunp6evXr9+8eVOr1YbDoYtCIrLrC0AgEAgsFovRaNRsNs/Pzy8vL3O5XDweD4VCLpoCsXPfP14XDAZDn7mofwgXEU/jfD4fj8fdbvf09PSPP/747bffXr9+XavVTNMkJPBjFouFaZrNZvPDhw/v3r3LZrN7e3uRSESSJH7FLF+Jge8fr7s5zyS0gk8b92d1ID59+tTpdC4vL//888/ffvvtjz/+OD097fV60+nURePJhIQjLJfL6XQqatI///xTrLhRFCUSibhrmxf7LJfL2WxmmuZwODRNczabrX7NxHjdYDDodDqDwWAymdz2pmbNWE8mk6qqyrIcjUZlWVYURZZld+2XAAcS32XRgbi4uLi4uDg7O3v9+vXr169PT09d
                    15AIEBLOMZ/Ph8NhrVZ7//79wcFBqVTKZrOKohASgii2Go3GxcVFo9EYDoerbRvxT7vdbr1e73a7XynnxdpXXdez2ayu63t7e6qqZjKZg4ODTCbDB457Eo9irVZ7+fLlixcv3r9/f3FxcXl5WavVer2e6xIiQEg4h3gBGQwGjUajVqt1u103Pk/2WSwWw+Hw4uLiP//5z9u3b1ut1nQ6Xf2nd6sk9vb2MpnMw4cPA4GAKCYICdyHeFCvrq5evnz5z3/+8/37981m89OnT6ZpTqdTN36jCQkHcfVkartZlcTbt29/++23q6ur8Xhs/dM79yQURdnf3w8EAqJ6c+N3GI5iTWe6vLw8Ozs7Pz8fDAbz+dy9658ICWdhSd1tRE9iOBy2Wq2rq6vz83PTNNf+4PtnN41Go36/L4aegsFgq9UaDodrfQ7gDsT7yng8/vTp06dPn0aj0WQy2fVF3QshAdcQX7/pdDoej03TXAuJH/3/ES2NYDA4Ho+n0yl1GzbFY696/w+mAsJwaqS/7QAAAABJRU5ErkJggg==`;
var mousedown = false;
var mouseup = true;
var ele;
var fill = "none";
var brushSize = 50;
var strokeColor = "#000000";
var maskele;
var pointdata = "";
var cursor;
var mouseover = false;
var slider;

$("#myTab").hide();
$("#home").hide();
$(".edit").click(() => {
  $("#myTab").show();
  $(".edit").hide();
  $("#home").show();
});

function onLoad() {
  maskele = document.getElementById("svgmask");
  //document.getElementById('MaskImage').setAttribute('href', 'data:image/png;base64, ' + mask);
  cursor = document.getElementById("pointer");

  cursor.style.width = brushSize + "px";
  cursor.style.height = brushSize + "px";
}

slider = document.getElementById("myRange");
slider.oninput = function () {
  brushSize = this.value;
  console.log(this.value);
  cursor.style.width = brushSize + "px";
  cursor.style.height = brushSize + "px";
};

function selectErase() {
  strokeColor = "#000000";
}

function selectRestore() {
  strokeColor = "#ffffff";
}

function getmouse(ev) {
  let e;
  if (ev.touches) {
    e = ev.touches[ev.touches.length - 1];
  } else {
    e = ev;
  }

  let xPos = e.pageX - $("#svgbox").offset().left;
  let yPos = e.pageY - $("#svgbox").offset().top;
  // console.log(xPos, yPos);
  $("#pointer").css({
    top: yPos,
    left: xPos,
  });
  if (mousedown) {
    console.log("drag");
    mouseover = true;
    pointdata += xPos + "," + yPos + " ";
    ele.setAttribute("points", pointdata);
  }
}

function onMouseDown(e) {
  mousedown = true;
  mouseup = false;
  mouseover = false;
  ele = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  ele.setAttribute("fill", fill);
  ele.setAttribute("stroke-width", brushSize);
  ele.setAttribute("stroke", strokeColor);
  ele.setAttribute("stroke-linecap", "round");
  ele.setAttribute("stroke-linejoin", "round");
  maskele.appendChild(ele);
}

function onMouseUp(e) {
  mousedown = false;
  mouseup = true;
  if (!mouseover) {
    let xPos = e.pageX - $("#svgbox").offset().left;
    let yPos = e.pageY - $("#svgbox").offset().top;
    ele.setAttribute(
      "points",
      xPos + "," + yPos + " " + (xPos + 1 + "," + yPos + " ")
    );
  }
  pointdata = "";
}

function setOG() {
  document.getElementById("og").setAttribute("href", fore);
}

//uploading code

var but = document.getElementById("upload");
var choose = document.getElementById("choose");
var loader = document.getElementById("loader");
var cancelButton = document.getElementById("cancelButton");
var editorContainer = document.getElementById("editor-container");

//$('#editor-container').hide();

$("#cancelButton").click(function () {
  $("#editor-container").hide();
  $("#upload").show();
  $("#drop-area").show();
});
$("#erase").click(function () {
  $(this).addClass("btn-primary");
  $("#restore").removeClass("btn-primary");
  selectErase();
});
$("#restore").click(function () {
  $(this).addClass("btn-primary");
  $("#erase").removeClass("btn-primary");
  selectRestore();
});

but.addEventListener("click", function () {
  choose.click();
});

var openFile = function (event) {
  var input = event.target;
  console.log(input);
  loader.style.display = "inline-block";
  var readerB64 = new FileReader();
  var reader = new FileReader();
  reader.readAsArrayBuffer(input.files[0]);
  readerB64.readAsDataURL(input.files[0]);
  readerB64.onload = () => {
    fore = readerB64.result;
    setOG();
  };
  reader.onload = function () {
    var dataURL = reader.result;
    console.log("before fecth");
    fetch("http://34.105.250.110/api/remove?fileName=nns.jpg", {
      method: "POST",
      body: dataURL,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (suc) {
        //loader.style.display = "none";
        //but.style.display = "none";
        $("#loader").hide();
        $("#upload").hide();
        $("#drop-area").hide();
        $("#editor-container").show();
        let img = document.getElementById("MaskImage");
        img.setAttribute("href", "data:image/png;base64, " + suc.image);
      })
      .catch((error) => console.log(error));
    console.log("after fetch");
  };
};

function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}

$(".bg-button").click((e) => {
  try {
    document.getElementById("rectbgcolor").remove();
  } catch (error) {
    console.log("no ele");
  }

  let id = e.currentTarget.getAttribute("data-id");
  let bgele = document.getElementById("Background");
  if (id != "") {
    toDataURL(id, function (dataUrl) {
      //console.log('RESULT:', dataUrl)
      bgele.setAttribute("href", dataUrl);
    });
  } else {
    bgele.setAttribute("href", "data:image/png;base64, ");
  }
});

function DownloadBtn(resno) {
  let svgele = document.getElementById("svgbox");
  let scale = 0.0;
  switch (resno) {
    case 0:
      scale = 0.75;
      break;
    case 1:
      scale = 1.25;
      break;
    case 2:
      scale = 2;
      break;
  }

  saveSvgAsPng(svgele, "magicremove.png", { scale: scale });
  console.log("downloaded");
}

$(".blur-button").click((event) => {
  let filterbox = document.getElementById("filterbox");
  let blurele = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "feGaussianBlur"
  );
  blurele.setAttribute("id", "blur01");
  blurele.setAttribute("result", "blur01");
  blurele.setAttribute("in", "SourceGraphic");
  let ch = event.currentTarget.getAttribute("data-id");

  switch (ch) {
    case "0":
      blurele.setAttribute("stdDeviation", "0 0");
      break;
    case "1":
      blurele.setAttribute("stdDeviation", "4 4");
      break;
    case "2":
      blurele.setAttribute("stdDeviation", "8 8");
  }
  filterbox.appendChild(blurele);
});

function handlecolor(e) {
  let rect;

  rect = document.getElementById("rectbgcolor");
  console.log(rect);
  if (rect == null) {
    console.log("create new bg ele");
    let setbg = document.getElementById("setbg");
    rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("id", "rectbgcolor");
    rect.setAttribute("width", "500px");
    rect.setAttribute("height", "500px");
    setbg.appendChild(rect);
  }
  console.log("color", event.target.value);
  rect.setAttribute("fill", e.target.value);
}

function handlezoom(e) {
  let svgbox = document.getElementById("svgbox");
  console.log(e.target.value);
  svgbox.style.width = e.target.value + "px";
  svgbox.style.height = e.target.value + "px";
}
