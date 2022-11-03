function openPart(evt, name) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}

var k;
var p;

// ------------------------------------------ LTI Impulse Response ----------------------------------------------------------

function imp(){
    var sel = document.getElementById("imp-names").value;
    sel = parseFloat(sel);

    var sigValues = [];
    for (var i=0; i<=40; i++)
    {
        if(i==20)
        {
            sigValues.push(1);
        }
        else
        {
            sigValues.push(0);
        }
    }
    
    if(sel==1)
    {
        var xValues = makeArr(-20,20,41);
        var yValues = [];
        yValues.push(sigValues[0]);
        for (var i=1; i<=40; i++)
        {
            yValues.push(sigValues[i]-sigValues[i-1]);
        }
    }
    else if(sel==2)
    {
        var xValues = makeArr(-20,20,41);
        var yValues = [];
        yValues.push(sigValues[0]);
        for (var i=1; i<=40; i++)
        {
            yValues.push(sigValues[i]+yValues[i-1]);
        }
    }

    var trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'markers'
    };
      
    var data = [trace1];

    var config = {responsive: true}

    var layout = {
        title: 'Impulse Response',
        showlegend: false,
        xaxis: {
            title: 'Time (t)'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };
      
    Plotly.newPlot('figure1', data, layout, config);
      var update = {
        width: 500,
        height: 400
    };
    Plotly.relayout('figure1', update);
}

// ------------------------------------------ LTI Step Response ----------------------------------------------------------

function step(){
    var sel = document.getElementById("imp-names1").value;
    sel = parseFloat(sel);

    var sigValues = [];
    for (var i=0; i<=40; i++)
    {
        if(i>=20)
        {
            sigValues.push(1);
        }
        else
        {
            sigValues.push(0);
        }
    }
    
    if(sel==1)
    {
        var xValues = makeArr(-20,20,41);
        var yValues = [];
        yValues.push(sigValues[0]);
        for (var i=1; i<=40; i++)
        {
            yValues.push(sigValues[i]-sigValues[i-1]);
        }
    }
    else if(sel==2)
    {
        var xValues = makeArr(-20,20,41);
        var yValues = [];
        yValues.push(sigValues[0]);
        for (var i=1; i<=40; i++)
        {
            yValues.push(sigValues[i]+yValues[i-1]);
        }
    }

    var trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'markers'
    };
      
    var data = [trace1];

    var config = {responsive: true}

    var layout = {
        title: 'Step Response',
        showlegend: false,
        xaxis: {
            title: 'Time (t)'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };
      
    Plotly.newPlot('figure2', data, layout, config);
      var update = {
        width: 500,
        height: 400
    };
    Plotly.relayout('figure2', update);
}

// ------------------------------------------ LTI System Functions ----------------------------------------------------------

function syst(){
    var sel1 = document.getElementById("sig-names2").value;
    sel = parseFloat(sel);
    var sel = document.getElementById("imp-names2").value;
    sel1 = parseFloat(sel1);
    am = 1;
    freq = 0.3;
    var sigValues = [];
    var yValues = [];

    if(sel==1)
    {
        var xValues = makeArr(-20,20,41);
        for (var i=0; i<=40; i++)
        {
            sigValues.push(am*Math.sin(freq*xValues[i]));
        }
    }
    else if(sel==2)
    {
        var xValues = makeArr(-20,20,41);
        for (var i=0; i<=40; i++)
        {
            sigValues.push(am*Math.cos(freq*xValues[i]));
        }
    }
    else if(sel==3)
    {
        var xValues = makeArr(-20,20,41);
        for (var i=0; i<=40; i++)
        {
            if(xValues[i]<0)
            {
                sigValues.push(0);
            }
            else
            {
                sigValues.push(am*xValues[i]);
            }
        }
    }
    else if(sel==4)
    {
        var xValues = makeArr(-20,20,41);
        for (var i=0; i<=40; i++)
        {
            if(i<13)
            {
                sigValues.push(0);
            }
            else if(i<26)
            {
                sigValues.push(am);
            }
            else
            {
                sigValues.push(0);
            }
        }
    }
    else
    {
        var xValues = makeArr(-20,20,41);
        for (var i=0; i<=40; i++)
        {
            if(i<parseFloat(20/freq))
            {
                sigValues.push(am);
            }
            else if(i<parseFloat(40/freq))
            {
                sigValues.push(-am);
            }
            else
            {
                sigValues.push(0);
            }
        }
    }
    
    if(sel1==1)
    {
        var yValues = [];
        yValues.push(sigValues[0]);
        for (var i=1; i<=40; i++)
        {
            yValues.push((sigValues[i]-sigValues[i-1]));
        }
    }
    else if(sel1==2)
    {
        var yValues = [];
        yValues.push(sigValues[0]);
        for (var i=1; i<=40; i++)
        {
            yValues.push(sigValues[i]+yValues[i-1]);
        }
    }

    var trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        name: 'output',
        mode: 'markers'
    };

    var trace2 = {
        x: xValues,
        y: sigValues,
        type: 'scatter',
        name: 'original',
        mode: 'line'
    };
      
    var data = [trace1,trace2];

    var config = {responsive: true}

    var layout = {
        title: 'Step Response',
        xaxis: {
            title: 'Time (t)'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };
      
    Plotly.newPlot('figure3', data, layout, config);
      var update = {
        width: 500,
        height: 400
    };
    Plotly.relayout('figure3', update);
}

// ------------------------------------------ Black Box1 ----------------------------------------------------------

function black(){
    var sigValues = [];
    var sigValues1 = [];
    var sigValues2 = [];
    var yValues = [];

    var sigValues = [];
    var yValues = [];

    k = Math.floor(Math.random() * 41)-20;
    p = Math.floor(Math.random() * 41)-20;

    var xValues = makeArr(-20,20,41);
    for (var i=0; i<=40; i++)
    {
        if(xValues[i]==p)
        {
            yValues.push(k);
        }
        else
        {
            yValues.push(0);
        }
        if(xValues[i]==0)
        {
            sigValues.push(1);
        }
        else
        {
            sigValues.push(0);
        }
    }

    for (var i=0; i<=40; i++)
    {
        sigValues1.push(Math.sin(0.5*(xValues[i])));
        sigValues2.push(0);
    }

    var trace1 = {
        x: xValues,
        y: sigValues,
        type: 'scatter',
        name: 'output',
        mode: 'markers'
    };

    var trace2 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        name: 'original',
        mode: 'markers'
    };

    var trace3 = {
        x: xValues,
        y: sigValues1,
        type: 'scatter',
        name: 'output',
        mode: 'line'
    };

    var trace4 = {
        x: xValues,
        y: sigValues2,
        type: 'scatter',
        name: 'output',
        mode: 'markers'
    };
      
    var data1 = [trace1];
    var data2 = [trace2];
    var data3 = [trace3];
    var data4 = [trace4];

    var config = {responsive: true}

    var layout1 = {
        title: 'Input Signal',
        xaxis: {
            title: 'Time (t)'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };

    var layout2 = {
        title: 'Output Signal',
        xaxis: {
            title: 'Time (t)'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };
      
    Plotly.newPlot('figure4', data1, layout1, config);
      var update = {
        width: 400,
        height: 300
    };
    Plotly.relayout('figure4', update);
    Plotly.newPlot('figure6', data2, layout2, config);
      var update = {
        width: 400,
        height: 300
    };
    Plotly.relayout('figure6', update);
    
    Plotly.newPlot('figure5', data3, layout1, config);
      var update = {
        width: 400,
        height: 300
    };
    Plotly.relayout('figure5', update);
    Plotly.newPlot('figure7', data4, layout2, config);
      var update = {
        width: 400,
        height: 300
    };
    Plotly.relayout('figure7', update);
}

// ------------------------------------------ Black Box Checking ----------------------------------------------------------

function blackCheck(){
    var yValues = [];
    var yValues1 = [];

    var freq = document.getElementById("fre1").value;
    freq = parseFloat(freq);
    var am = document.getElementById("amp1").value;
    am = parseFloat(am);
    var sh = document.getElementById("shift1").value;
    sh = parseFloat(sh);

    if(freq!=0.5 || am!=k || sh!=p)
    {
        window.alert("Wrong Answer! Check Plot for help!");
    }
    else
    {
        window.alert("Right Answer!");
    }

    var xValues = makeArr(-20,20,41);

    for (var i=0; i<=40; i++)
    {
        yValues.push(am*Math.sin(freq*(xValues[i])-sh));
        yValues1.push(k*Math.sin(0.5*(xValues[i])-p));
    }

    var trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        name: 'Your-Output',
        mode: 'line',
        marker: {
            color: 'rgb(255, 0, 0)',
            size: 8
        }
    };

    var trace2 = {
        x: xValues,
        y: yValues1,
        type: 'scatter',
        name: 'Ideal-Output',
        mode: 'line',
        marker: {
            color: 'rgb(0, 255, 0)',
            size: 8
        }
    };
      
    var data1 = [trace1,trace2];

    var config = {responsive: true}

    var layout2 = {
        title: 'Simulated',
        xaxis: {
            title: 'Time (t)'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };

    Plotly.newPlot('figure7', data1, layout2, config);
      var update = {
        width: 400,
        height: 300
    };
    Plotly.relayout('figure7', update);
}

// ------------------------------------------ Black Box 2 ----------------------------------------------------------

function black1(){
    var sigValues = [];
    var sigValues1 = [];
    var sigValues2 = [];
    var yValues = [];
    var yValues2 = [];

    k1 = 5;
    p1 = -10;
    k2 = 2;
    p2 = 10;

    var xValues = makeArr(-20,20,41);
    for (var i=0; i<=40; i++)
    {
        if(xValues[i]==p1)
        {
            yValues.push(k1);
        }
        else if(xValues[i]==p2)
        {
            yValues.push(k2);
        }
        else
        {
            yValues.push(0);
        }
        // for delta
        if(xValues[i]==0)
        {
            sigValues.push(1);
        }
        else
        {
            sigValues.push(0);
        }
    }

    for (var i=0; i<=40; i++)
    {
        if(xValues[i]==2)
        {
            sigValues1.push(1);
        }
        else
        {
            sigValues1.push(0);
        }
        if(xValues[i]==-2)
        {
            sigValues2.push(1);
        }
        else
        {
            sigValues2.push(0);
        }
    }

    var trace1 = {
        x: xValues,
        y: sigValues,
        type: 'scatter',
        name: 'output',
        mode: 'markers'
    };

    var trace2 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        name: 'original',
        mode: 'markers'
    };

    var trace3 = {
        x: xValues,
        y: sigValues1,
        name: 'impulse 1',
        type: 'scatter',
        mode: 'markers'
    };

    var trace4 = {
        x: xValues,
        y: sigValues2,
        name: 'impulse 2',
        type: 'scatter',
        mode: 'markers'
    };
      
    var data1 = [trace1];
    var data2 = [trace2];
    var data3 = [trace3, trace4];

    var config = {responsive: true}

    var layout1 = {
        title: 'Input Signal',
        xaxis: {
            title: 'Time (t)'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };

    var layout2 = {
        title: 'Output Signal',
        xaxis: {
            title: 'Time (t)'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };
      
    Plotly.newPlot('figure8', data1, layout1, config);
      var update = {
        width: 400,
        height: 300
    };
    Plotly.relayout('figure8', update);
    Plotly.newPlot('figure9', data2, layout2, config);
      var update = {
        width: 400,
        height: 300
    };
    Plotly.relayout('figure9', update);
    Plotly.newPlot('figure10', data3, layout1, config);
      var update = {
        width: 400,
        height: 300
    };
    Plotly.relayout('figure10', update);
}

// ------------------------------------------ Black Box 1 Checking ----------------------------------------------------------

function blackCheck1(){
    var yValues = [];
    var yValues1 = [];

    var am1 = document.getElementById("amp2").value;
    am1 = parseFloat(am1);
    var sh1 = document.getElementById("shift2").value;
    sh1 = parseFloat(sh1);
    var am2 = document.getElementById("amp3").value;
    am2 = parseFloat(am2);
    var sh2 = document.getElementById("shift3").value;
    sh2 = parseFloat(sh2);
    var am3 = document.getElementById("amp4").value;
    am3 = parseFloat(am3);
    var sh3 = document.getElementById("shift4").value;
    sh3 = parseFloat(sh3);
    var am4 = document.getElementById("amp5").value;
    am4 = parseFloat(am4);
    var sh4 = document.getElementById("shift5").value;
    sh4 = parseFloat(sh4);

    if(am4>5 || am4<2 || am3>5 || am3<2 || am2>5 || am2<2 || am1>5 || am1<2 || sh4>12 || sh4<-12 || sh3>12 || sh3<-12 || sh2>12 || sh2<-12 || sh1>12 || sh1<-12)
    {
        window.alert("Wrong Answer! Retry!");
    }
    else
    {
        var xValues = makeArr(-20,20,41);
        console.log(sh1,sh2,sh3,sh4,am1,am2,am3,am4);
        for (var i=0; i<=40; i++)
        {
            if(xValues[i]==sh4)
            {
                yValues.push(am4);
            }
            else if(xValues[i]==sh3)
            {
                yValues.push(am3);
            }
            else if(xValues[i]==sh2)
            {
                yValues.push(am2);
            }
            else if(xValues[i]==sh1)
            {
                yValues.push(am1);
            }
            else
            {
                yValues.push(0);
            }
            // Actual
            if(xValues[i]==12 || xValues[i]==8)
            {
                yValues1.push(2);
            }
            else if(xValues[i]==-12 || xValues[i]==-8)
            {
                yValues1.push(5);
            }
            else
            {
                yValues1.push(0);
            }
        }
        var flag = 0;
        for (var i=0; i<=40; i++)
        {
            if(yValues[i]!=yValues1[i])
            {
                flag = 1;
                break;
            }
        }
        if(flag)
        {
            window.alert("Wrong Answer! Retry");
        }
        else
        {
            window.alert("Right Answer!");
        }
    }
}

// ------------------------------------------ Blocks init ----------------------------------------------------------

function blocks(){
    var yValues = [];

    k1 = 5;
    p1 = -10;
    k2 = 2;
    p2 = 10;

    var xValues = makeArr(-20,20,41);
    for (var i=0; i<=40; i++)
    {
        if(xValues[i]==p1)
        {
            yValues.push(k1);
        }
        else if(xValues[i]==p2)
        {
            yValues.push(k2);
        }
        else
        {
            yValues.push(0);
        }
    }

    var trace2 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        name: 'original',
        mode: 'markers'
    };
    var data2 = [trace2];

    var config = {responsive: true}

    var layout2 = {
        title: 'Input Signal',
        xaxis: {
            title: 'Time (t)'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };

    Plotly.newPlot('figure11', data2, layout2, config);
      var update = {
        width: 400,
        height: 300
    };
    Plotly.relayout('figure11', update);
}

/*
// ------------------------------------------ Fourier Basis ----------------------------------------------------------

function four(){
	N = document.getElementById("N1").value
	k11 = document.getElementById("k1").value
	k22 = document.getElementById("k2").value
    
    N = parseFloat(N);
    k11 = parseFloat(k11);
    k22 = parseFloat(k22);

    if(N<2)
    {
        N = 2;
    }
    
    if(k11 > N-1)
    {
        k11 = N-1;
    }
    
    if(k22 > N-1)
    {
        k22 = N-1;
    }
    
    var xValues = makeArr(-2,2,1000);

    yValuesFinalReal = [];
    yValuesFinalImag = [];
    for(var i=0; i<1000; i++)
    {
        yValuesFinalReal.push(am*am*(Math.cos(2*Math.PI*k11*xValues[i]/N))*(Math.cos(2*Math.PI*k22*xValues[i]/N)) - am*am*(Math.sin(2*Math.PI*k11*xValues[i]/N))*(Math.sin(2*Math.PI*k22*xValues[i]/N)));
        yValuesFinalImag.push(am*am*(Math.cos(2*Math.PI*k11*xValues[i]/N))*(Math.sin(2*Math.PI*k22*xValues[i]/N)) + am*am*(Math.sin(2*Math.PI*k11*xValues[i]/N))*(Math.cos(2*Math.PI*k22*xValues[i]/N)));
    }
    
    yValuesPosReal = [];
    yValuesNegReal = [];
    yValuesPosImag = [];
    yValuesNegImag = [];

    for(var i=0; i<1000; i++)
    {
        if(yValuesFinalReal[i]<0)
        {
            yValuesPosReal.push(yValuesFinalReal[i]);
            yValuesNegReal.push(0);
        }
        else
        {
            yValuesNegReal.push(yValuesFinalReal[i]);
            yValuesPosReal.push(0);
        }

        if(yValuesFinalImag[i]<0)
        {
            yValuesPosImag.push(yValuesFinalImag[i]);
            yValuesNegImag.push(0);
        }
        else
        {
            yValuesNegImag.push(yValuesFinalImag[i]);
            yValuesPosImag.push(0);
        }
    }

    var trace1 = {
        x: xValues,
        y: yValuesPosReal,
        type: 'scatter',
        fill: 'tonexty'
    };

    var trace2 = {
        x: xValues,
        y: yValuesNegReal,
        type: 'scatter',
        fill: 'tozeroy'
    };

    var trace3 = {
        x: xValues,
        y: yValuesNegImag,
        xaxis: 'x2',
        yaxis: 'y2',
        type: 'scatter',
        fill: 'tonexty'
    };

    var trace4 = {
        x: xValues,
        y: yValuesPosImag,
        xaxis: 'x2',
        yaxis: 'y2',
        type: 'scatter',
        fill: 'tozeroy'
    };
      
    var data = [trace1, trace2, trace3, trace4];

    var config = {responsive: true}

    var layout = {
        title: 'Orthogonality of Fourier Basis functions',
        showlegend: false,
        grid: {rows: 1, columns: 2, pattern: 'independent'},
        xaxis: {
            title: 'Time (t)'
        },
        yaxis: {
            title: 'Amplitude (A)'
        },
        xaxis2: {
            title: 'Time (t)'
        },
        yaxis2: {
            title: 'Amplitude (A)'
        },
        annotations: [{
            text: "Real Part",
            font: {
                size: 16,
            },
            showarrow: false,
            align: 'center',
            x: 0,
            y: am+0.1,
            xref: 'x',
            yref: 'y',
        },
        {
            text: "Imaginery",
            font: {
              size: 16,
            },
            showarrow: false,
            align: 'center',
            x: 0,
            y: am+0.1,
            xref: 'x2',
            yref: 'y2',
        }]
    };
      
    Plotly.newPlot('figure3', data, layout, config);
      var update = {
        width: 500,
        height: 400
    };
    Plotly.relayout('figure3', update);

    if(k11==k22)
    {
        document.getElementById("in2").innerHTML = 1.0;
        return;
    }
    document.getElementById("in2").innerHTML = 0.0;
}

// ------------------------------------------ Haar Wavelets ----------------------------------------------------------

function har(){
    sig5 = document.getElementById("sig-names5").value
	sig6 = document.getElementById("sig-names6").value
    
    sig5 = parseFloat(sig5);
    sig6 = parseFloat(sig6);

    var xValues = makeArr(-2,2,1000);
    var yValues1 = [];
    for (var i=0; i<1000; i++)
    {
        if(i<parseFloat(500/sig5))
        {
            yValues1.push(am1);
        }
        else if(i<parseFloat(1000/sig5))
        {
            yValues1.push(-am1);
        }
        else
        {
            yValues1.push(0);
        }
    }

    var yValues2 = [];
    for (var i=0; i<1000; i++)
    {
        if(i<parseFloat(500/sig6))
        {
            yValues2.push(am1);
        }
        else if(i<parseFloat(1000/sig6))
        {
            yValues2.push(-am1);
        }
        else
        {
            yValues2.push(0);
        }
    }

    yValuesFinal = math.dotMultiply(yValues1,yValues2)

    var sum = 0;
    for(var i=0; i<1000; i++)
    {
        sum += yValuesFinal[i];
    }

    sum /= 1000;
    if(sum<0.001)
    {
        sum = 0;
    }

    document.getElementById("in3").innerHTML = sum.toPrecision(2);

    yValuesPos = [];
    yValuesNeg = [];

    for(var i=0; i<1000; i++)
    {
        if(yValuesFinal[i]<0)
        {
            yValuesPos.push(yValuesFinal[i]);
            yValuesNeg.push(0);
        }
        else
        {
            yValuesNeg.push(yValuesFinal[i]);
            yValuesPos.push(0);
        }
    }

    var trace1 = {
        x: xValues,
        y: yValuesPos,
        type: 'scatter',
        fill: 'tonexty'
    };

    var trace2 = {
        x: xValues,
        y: yValuesNeg,
        type: 'scatter',
        fill: 'tozeroy'
    };
      
    var data = [trace1, trace2];

    var config = {responsive: true}

    var layout = {
        title: 'Orthogonality of Haar Wavelets',
        showlegend: false,
        xaxis: {
            title: 'Time (t)'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };
      
    Plotly.newPlot('figure4', data, layout, config);
      var update = {
        width: 500,
        height: 400
    };
    Plotly.relayout('figure4', update);
}

function orth(){
    var sel = document.getElementById("sig-names7").value;
    sel = parseFloat(sel);
    freq = document.getElementById("fre3").value;
    freq = parseFloat(freq);
    am = document.getElementById("amp3").value;
    am = parseFloat(am);
    
    if(sel==1)
    {
        var xValues = makeArr(-2*Math.PI,2*Math.PI,1000);
        var yValues = [];
        for (var i=0; i<1000; i++)
        {
            yValues.push(am*Math.sin(freq*xValues[i]));
        }
    }
    else if(sel==2)
    {
        var xValues = makeArr(-2*Math.PI,2*Math.PI,1000);
        var yValues = [];
        for (var i=0; i<1000; i++)
        {
            yValues.push(am*Math.cos(freq*xValues[i]));
        }
    }
    else if(sel==3)
    {
        var xValues = makeArr(-2,2,1000);
        var yValues = [];
        for (var i=0; i<1000; i++)
        {
            yValues.push(am*xValues[i]);
        }
    }
    else if(sel==4)
    {
        var xValues = makeArr(-2,2,1000);
        var yValues = [];
        for (var i=0; i<1000; i++)
        {
            if(i<333)
            {
                yValues.push(0);
            }
            else if(i<666)
            {
                yValues.push(am);
            }
            else
            {
                yValues.push(0);
            }
        }
    }
    else
    {
        var xValues = makeArr(-2,2,1000);
        var yValues = [];
        for (var i=0; i<1000; i++)
        {
            if(i<parseFloat(500/freq))
            {
                yValues.push(am);
            }
            else if(i<parseFloat(1000/freq))
            {
                yValues.push(-am);
            }
            else
            {
                yValues.push(0);
            }
        }
    }

    var sel1 = document.getElementById("sig-names8").value;
    sel1 = parseFloat(sel1);
    freq1 = document.getElementById("fre4").value;
    freq1 = parseFloat(freq1);
    am1 = document.getElementById("amp4").value;
    am1 = parseFloat(am1);
    
    if(sel1==1)
    {
        var xValues1 = makeArr(-2*Math.PI,2*Math.PI,1000);
        var yValues1 = [];
        for (var i=0; i<1000; i++)
        {
            yValues1.push(am1*Math.sin(freq1*xValues1[i]));
        }
    }
    else if(sel1==2)
    {
        var xValues1 = makeArr(-2*Math.PI,2*Math.PI,1000);
        var yValues1 = [];
        for (var i=0; i<1000; i++)
        {
            yValues1.push(am1*Math.cos(freq1*xValues1[i]));
        }
    }
    else if(sel1==3)
    {
        var xValues1 = makeArr(-2,2,1000);
        var yValues1 = [];
        for (var i=0; i<1000; i++)
        {
            yValues1.push(am1*xValues1[i]);
        }
    }
    else if(sel1==4)
    {
        var xValues1 = makeArr(-2,2,1000);
        var yValues1 = [];
        for (var i=0; i<1000; i++)
        {
            if(i<333)
            {
                yValues1.push(0);
            }
            else if(i<666)
            {
                yValues1.push(am1);
            }
            else
            {
                yValues1.push(0);
            }
        }
    }
    else
    {
        var xValues1 = makeArr(-2,2,1000);
        var yValues1 = [];
        for (var i=0; i<1000; i++)
        {
            if(i<parseFloat(500/freq1))
            {
                yValues1.push(am1);
            }
            else if(i<parseFloat(1000/freq1))
            {
                yValues1.push(-am1);
            }
            else
            {
                yValues1.push(0);
            }
        }
    }

    yValuesFinal = math.dotMultiply(yValues,yValues1)

    var sum = 0;
    for(var i=0; i<1000; i++)
    {
        sum += yValuesFinal[i];
    }

    sum /= 1000;
    if(sum<0.001)
    {
        sum = 0;
    }

    document.getElementById("in4").innerHTML = sum.toPrecision(2);

    yValuesPos = [];
    yValuesNeg = [];

    for(var i=0; i<1000; i++)
    {
        if(yValuesFinal[i]<0)
        {
            yValuesPos.push(yValuesFinal[i]);
            yValuesNeg.push(0);
        }
        else
        {
            yValuesNeg.push(yValuesFinal[i]);
            yValuesPos.push(0);
        }
    }

    var trace1 = {
        x: xValues,
        y: yValuesPos,
        type: 'scatter',
        fill: 'tonexty'
    };

    var trace2 = {
        x: xValues,
        y: yValuesNeg,
        type: 'scatter',
        fill: 'tozeroy'
    };
      
    var data = [trace1, trace2];

    var config = {responsive: true}

    var layout = {
        title: 'Product of Signals',
        showlegend: false,
        xaxis: {
            title: 'Time (t)'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };
      
    Plotly.newPlot('figure5', data, layout, config);
      var update = {
        width: 500,
        height: 400
    };
    Plotly.relayout('figure5', update);
}*/

function makeArr(startValue, stopValue, cardinality) {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
      arr.push(startValue + (step * i));
    }
    return arr;
}

// ------------------------------------------ On startup ----------------------------------------------------------

function startup()
{
    imp();
    step();
    syst();
    black();
    black1();
    blocks();
    document.getElementById("default").click();
}

window.onload = startup;