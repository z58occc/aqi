import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import { useEffect, useState } from 'react';


function App() {
  const apiKey = 'f78c69dc-fe37-4ad3-8fe3-25a7d7a2cd3e'
  const [data, setData] = useState([]);
  const [countys, setCountys] = useState([]);
  const [choosenData, setChoosenData] = useState([]);
  const [county, setCounty] = useState('');

  const getColor = (num) => {
    if (num < 50) return "#95F084";
    else if (num < 100) return '#FFE695';
    else if (num < 150) return '#FFAF6A';
    else if (num < 200) return '#FF5757';
    else if (num < 300) return '#9777FF';
    else if (num < 400) return '#AD1774';
  }

  const getData = async () => {
    try {
      const res = await axios.get(`https://data.moenv.gov.tw/api/v2//aqx_p_432?api_key=${apiKey}`)
      const data = res.data.records;
      setCounty('高雄市');
      const filterArr = data.filter((item, i) => item.county === '高雄市');
      setChoosenData(filterArr);
      setData(data);

      const arr = data.map((item) => {
        return item.county;
      })

      const countys = arr.filter((item, index) => arr.indexOf(item) === index);
      setCountys(countys);
    } catch (error) {
      console.log(error);
    }
  }

  const filterData = (county) => {
    setCounty(county);
    const filterArr = data.filter((item, i) => item.county === county);
    setChoosenData(filterArr);
  }
  useEffect(() => {
    getData();
  }, [])







  return (
    <div className="App">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Chocolate+Classical+Sans&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Chocolate+Classical+Sans&family=Noto+Sans+TC:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
      <div className='back '>
        <div className='container d-grid'>
          <div className="row g-0">
            <div className="col-4"
              style={{
                width: '380px'
              }}
            >
              <div className="title d-flex">
                <div className='title-1'>
                  空氣品質指標
                </div>
                <div className='title-2'>
                  (AQI)
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <span className='arrow-up '></span>
                <span className='arrow-down '></span>
                <select aria-label="Default select example"
                  style={{
                    height: '56px',
                    marginTop: '8px',
                    textAlign: 'left',
                    font: 'normal normal bold 16px/24px Noto Sans CJK TC',
                    letterSpacing: '0px',
                    color: '#000000',
                    textIndent: '20px'
                  }}
                  onChange={(e) => filterData(e.target.value)
                  }
                  defaultValue={1}
                  className='custom-selcect'
                >
                  <option className='first-option' disabled value={1}>
                    請選擇地區
                  </option>
                  {countys.map((conty, i) => {
                    return (
                      <option key={i} >{conty}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="col">
              <table style={{
                marginTop: '53px'
              }}>
                <tbody>
                  <tr>
                    <td className='td-cell align-middle align-middle'
                      style={{
                        backgroundColor: '#95F084',
                        padding: '0px'
                      }}
                    >
                      0～50
                    </td>
                    <td className='td-cell align-middle'
                      style={{
                        backgroundColor: '#FFE695'
                      }}
                    >
                      51～100
                    </td>
                    <td className='td-cell align-middle'
                      style={{
                        backgroundColor: '#FFAF6A'
                      }}>
                      101～150
                    </td>
                    <td className='td-cell align-middle'
                      style={{
                        backgroundColor: '#FF5757'
                      }}>
                      151～200
                    </td>
                    <td className='td-cell align-middle'
                      style={{
                        backgroundColor: '#9777FF'
                      }}>
                      201～300
                    </td>
                    <td className='td-cell align-middle'
                      style={{
                        backgroundColor: '#AD1774'
                      }}>
                      301～400
                    </td>
                  </tr>
                  <tr className='status  align-middle'>
                    <td >
                      良好
                    </td>
                    <td >
                      普通
                    </td>
                    <td>
                      <div className='m-auto'>
                        對敏感族群 不健康
                      </div>
                    </td>
                    <td>
                      <div className='m-auto'>
                        對所有族群 不健康
                      </div>
                    </td>
                    <td >
                      非常不健康
                    </td>
                    <td >
                      危害
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className='d-flex align-items-center'
            style={{
              marginTop: '32px'
            }}
          >
            <div className='title-3'>
              {county}
            </div>
            <div className='dot'>
            </div>
            <div className='time'>
              2019-01-24 14:00
            </div>
            <div className='update'>
              更新
            </div>

          </div>
          <div className="row g-0"
            style={{
              marginTop: '32px',
            }}
          >
            <div className="col-4"
              style={{
                width: '380px',
              }}
            >
              <div className='big-box'
                style={{
                  marginRight: '30px'
                }}
              >
                <div className='top d-flex'>
                  <div className='d-flex
                  justify-content-center
                  align-items-center
                  border-top-0
                  border-start-0
                  '
                    style={{
                      width: '190px',
                      height: '97px',
                      border: '3px solid #000000'
                    }}
                  >
                    <div className='district '>
                      {choosenData[0]?.sitename}
                    </div>
                  </div>
                  <div className='d-flex
                  justify-content-center
                  align-items-center
                  data-box
                  '
                    style={{
                      width: '160px',
                      height: '97px',
                      backgroundColor: getColor(choosenData[0]?.aqi)

                    }}
                  >
                    <div className='data '>
                      {choosenData[0]?.aqi}
                    </div>
                  </div>

                </div>
                <div className='under'>
                  <div className='d-flex prop-bar'
                    style={{
                      marginTop: '30px'
                    }}
                  >
                    <div className='prop'>臭氧</div>
                    <div className='align-self-end'
                      style={{
                        marginLeft: '8px'
                      }}
                    >O3 (ppb)</div>
                    <div className='prop-num ms-auto align-self-center'>
                      {choosenData[0]?.o3}
                    </div>
                  </div>
                  <div className='d-flex prop-bar'

                  >
                    <div className='prop'>懸浮微粒</div>
                    <div className='align-self-end'
                      style={{
                        marginLeft: '8px'
                      }}
                    >
                      PM10 (μg/m³)
                    </div>
                    <div className='prop-num ms-auto align-self-center'
                    >
                      {choosenData[0]?.pm10}
                    </div>
                  </div>
                  <div className='d-flex prop-bar'

                  >
                    <div className='prop'>細懸浮微粒</div>
                    <div className='align-self-end'
                      style={{
                        marginLeft: '8px'
                      }}
                    >
                      PM2.5 (μg/m³)
                    </div>
                    <div className='prop-num ms-auto align-self-center'
                    >
                      {choosenData?.[0]?.['pm2.5']}
                    </div>
                  </div>
                  <div className='d-flex prop-bar'

                  >
                    <div className='prop'>一氧化碳</div>
                    <div className='align-self-end'
                      style={{
                        marginLeft: '8px'
                      }}
                    >
                      CO (ppm)
                    </div>
                    <div className='prop-num ms-auto align-self-center'
                    >
                      {choosenData[0]?.co}
                    </div>
                  </div>
                  <div className='d-flex prop-bar'

                  >
                    <div className='prop'>二氧化硫</div>
                    <div className='align-self-end'
                      style={{
                        marginLeft: '8px'
                      }}
                    >
                      SO2 (ppb)
                    </div>
                    <div className='prop-num ms-auto align-self-center'
                    >
                      {choosenData[0]?.so2}
                    </div>
                  </div>
                  <div className='d-flex prop-bar '
                    style={{
                      borderBottom: '0px'
                    }}
                  >
                    <div className='prop'>二氧化氮</div>
                    <div className='align-self-end'
                      style={{
                        marginLeft: '8px'
                      }}
                    >
                      NO2 (ppb)
                    </div>
                    <div className='prop-num ms-auto align-self-center'
                    >
                      {choosenData[0]?.no2}
                    </div>
                  </div>


                </div>

              </div>
            </div>
            <div className="col "
              style={{
              }}
            >

              <div className='row'>
                {choosenData?.map((item, i) => {
                  return (
                    <div className='top d-flex col'
                      style={{
                        maxWidth: '380px',
                        padding: '16px 15px'
                      }}
                      key={i}
                    >
                      <div className='d-flex
                  justify-content-center
                  align-items-center
                  border-end-0
                  '
                        style={{
                          width: '190px',
                          height: '97px',
                          border: '3px solid #000000',
                        }}
                      >
                        <div className='district '>
                          {item?.sitename}
                        </div>
                      </div>
                      <div className='d-flex
                  justify-content-center
                  align-items-center
                  data-box
                  '
                        style={{
                          width: '160px',
                          height: '97px',
                          border: '3px solid #000000',
                          backgroundColor: getColor(item?.aqi)

                        }}
                      >
                        <div className='data'>
                          {item?.aqi}
                        </div>
                      </div>

                    </div>
                  )
                })}

              </div>

            </div>

          </div>
        </div>
        <div className='footer d-flex'>
          <div className='footer-1'>
            資料來源：行政院環境保護署
          </div>
          <div className='footer-2 ms-auto'>
            Copyright © 2019 HexSchool. All rights reserved.
          </div>
        </div>

      </div>
    </div >
  );
}

export default App;
