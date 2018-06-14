import { Modal } from 'antd';
import reqwest from 'reqwest';

const apiurl = 'https://t.litongjinfu.com/'

const PublicFun ={
    url:apiurl,
    ajax:(_url,_data,Success,Fail,_method,_type)=>{
        _method = _method ? _method:'get';
        _type = _type ? _type : 'json';
        if(typeof Fail !== 'function'){
            Fail = (data)=>{
                Modal.warning({
                    title: 'This is a warning message',
                    content: data,
                  });
            }
        } 
        reqwest({
            url: apiurl+_url,
            method: _method,
            data: _data,
            type: _type,
          }).then((data) => {
            
          });
    }
        
}
export default  PublicFun;