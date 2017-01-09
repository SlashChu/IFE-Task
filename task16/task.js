/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiCityInput = document.getElementById('aqi-city-input');
var aqiValueInput = document.getElementById('aqi-value-input');

var aqiData = {

};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
 /*判断用户输入情况的*/
 var cityNameRexEn = /^[\u4e00-\u9fa5]+$/i;
 var cityNameRexCn = /^[a-zA-Z]+$/i
 var cityAqiDataRex = /[0-9]/i;
 var cityName = '';
 var cityAqiData = '';
function addAqiData() {
    cityName = aqiCityInput.value;
    cityAqiData =  aqiValueInput.value;
    if((!cityNameRexEn.test(cityName)) && (!cityNameRexCn.test(cityName))){
        alert('城市名必须为中英文');
    }else if(!cityAqiDataRex.test(cityAqiData)){
        alert('空气指数只能为正整数');
    }else{
        aqiData[cityName] = cityAqiData;
    }
}

/**
 * 渲染aqi-table表格
 */
 var aqiTable = document.getElementById('aqi-table');

    // <tr>
    //   <td>城市</td><td>空气质量</td><td>操作</td>
    // </tr>
    // <tr>
    //   <td>北京</td><td>90</td><td><button>删除</button></td>
    // </tr>
    // <tr>
    //   <td>北京</td><td>90</td><td><button>删除</button></td>
    // </tr>

function renderAqiList() {
    var thead = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
    var tbody = '<tr><td>{cityName}</td><td>{aqiData}</td><td><button>删除</button></td></tr>';

    for (e in aqiData) {
        thead += tbody.replace('{cityName}',e).replace('{aqiData}',aqiData[e]);
    }
    aqiTable.innerHTML = thead;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
  // do sth.
  var removeE = e.target.parentNode.parentNode.firstChild.innerHTML;
  delete aqiData[removeE];
  console.log(aqiData);
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById('add-btn').addEventListener('click',addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.getElementById('aqi-table').addEventListener('click',delBtnHandle);
}

init();