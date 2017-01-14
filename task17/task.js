/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}
// 用于渲染图表的数据
var chartData = {};

// 初始化select城市名称

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: '北京',
    nowGraTime: "day"
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
console.log(aqiSourceData);
/**
 * 渲染图表
 */
var aqiChart = document.getElementById('aqi-chart-wrap');

function renderChart() {
    var contents = '';
    var content = '<span style="height: {aqiData}px;background:{color};width:{width}px;transition:all {time}s ease" title={title}></span>';
    var index = 1;
    var i = 0;
    for (e in chartData) {
        color = '#' + ('000000' + Math.floor(Math.random() * 0xFFFFFF).toString(16)).slice(-6);
        contents += content.replace("{aqiData}", chartData[e]).replace('{color}', color).replace('{title}', e + 'Aqi指数:' + chartData[e]).replace('{width}', chartData.width);
    }
    aqiChart.innerHTML = contents;
}
renderChart();

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化 
    if (this.value == pageState.nowGraTime) {
        alert('没变化');
    } else {
        pageState.nowGraTime = this.value;
        // 设置对应数据
        initAqiChartData();
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化 
    //change事件已经进行了是否变化的判断
    // 设置对应数据
    pageState.nowSelectCity = this.value;
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var date = document.getElementsByName('gra-time');
    for (var i = 0; i < date.length; i++) {
        date[i].addEventListener('click', graTimeChange);
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var select = document.getElementById('city-select');
    for (city in aqiSourceData) {
        var option = document.createElement('option');
        option.value = city;
        option.innerHTML = city;
        select.appendChild(option);
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.addEventListener('change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 同一个城市总计天数的数据集合
    console.log(aqiSourceData);
    var nowCityData = aqiSourceData[pageState.nowSelectCity];
    // 处理好的数据存到 chartData 中
    console.log(pageState.nowGraTime);
    if (pageState.nowGraTime == 'day') {
        chartData = nowCityData;
        chartData.width = 7;
    } else if (pageState.nowGraTime == 'week') {
        //清空chartData的数据
        chartData = {};
        var count = 0,
            week = 0,
            days = 0;
        for (e in nowCityData) {
            //AQI数值的总计
            count += nowCityData[e];
            days++;
            if (new Date(e).getDay() == 6) { //判断每次到星期天时，周次加1
                week++;
                chartData['第' + week + '周'] = Math.floor(count / days); //计算每周的数据并存入chartData中
                count = 0;
                days = 0;
            }
        }
        if (days != 0) {
            week++;
            chartData['第' + week + '周'] = Math.floor(count / days);
        }
        chartData.width = 20
    } else if (pageState.nowGraTime == 'month') {
        //清空chartData的数据
        chartData = {};
        var count = 0,
            month = 0,
            days = 0;
        for (e in nowCityData) {
            //AQI数值的总计
            count += nowCityData[e];
            days++;
            if (new Date(e).getMonth() !== month) {
                month++;
                chartData['第' + month + '月'] = Math.floor(count / days);
                count = 0;
                days = 0;
            }
        }
        if (days != 0) {
            month++;
            chartData['第' + month + '月'] = Math.floor(count / days);
        }
        chartData.width = 45;
    }
    console.log(chartData);
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();