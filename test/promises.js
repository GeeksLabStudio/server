const BD = {};

BD.findUser = () => {
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      resolve('')
      // reject('bla')
    },2000)

  })
}

function authenticate(){
  return BD.findUser()
      .then(user => {

        if (user){
          console.log('finded '+ user)
          // resolve(user)
          return user
        } else {
          console.log('nixya net suka')
          // reject('nihuya net')
          return Promise.reject()
        }

      })
      .then(user=>{
        console.log('yra')
        return user
      })
      .then(null, err => {
        return 'sukaaaaa'
      })

}



authenticate()
  .then(user=>{
    console.log('vse ok'+ user)
  })
  .then(null, (err)=>{
    console.log('ne ok #'+err)
  })