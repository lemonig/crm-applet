export const range = [
  {
    id: 0,
    label: '全部',
    value: 0,
  },
  {
    id: 1,
    label: '我负责',
    value: 1,
  },
  {
    id: 2,
    label: '下属负责',
    value: 2,
  },
];
//全部、东部大区、北部大区、南部大区
export const appart = [
  //   {
  //     id: '1',
  //     label: '全部',
  //     value: '1',
  //     checked: false,
  //   },
  //   {
  //     id: '2',
  //     label: '东部大区',
  //     value: '3',
  //     checked: true,
  //   },
  //   {
  //     id: '3',
  //     label: '北部大区',
  //     value: '3',
  //     checked: false,
  //   },
  //   {
  //     id: '4',
  //     label: '南部大区',
  //     value: '4',
  //     checked: false,
  //   },
];


export function yearListFun() {
  let yearList = [];
  let year = new Date().getFullYear();
  for (let i = 0; i <= 10; i++) {
    yearList.push(year - i);
  }
  return yearList;
}
