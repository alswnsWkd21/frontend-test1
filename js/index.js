// nav를 가져오는 이유는 각각의 탭에 이벤트리스너를 주지않고 nav하나에만 줘서 e.target으로 각각의 클릭에 대응하기 위함
var elemNav = findClass("nav",0);
var elemBtn = findClass("btnView",0);
//처음 active가 li첫번째요소에 가있는데.  나중에 제거하기위해서 미리 elemChoice에 미리담아넣는다.
var elemChoice = findClass("active",0);
var count=1;
//맨처음 화면은 trending으로 데이터가져온다.
getBtn('trending',1);

//클릭한 LI active클래스주기및 데이터 블러오기
var togleActive = function(e){
  var upNode=e.target.parentNode;
  if(upNode.nodeName=='LI'){
    //만약 다른탭을 눌렀을 경우 기존선택됬던 탭의 active제거하는 조건문
    if(elemChoice != null)
    {elemChoice.className="";}
    upNode.className ='active';
    //다른 탭을 선택하면 active를 제거해주기위해 active된 li를 저장해 놓는다.
    elemChoice = upNode;
    //만약 트렌딩탭을 선택한다면 캐러셀 포지션 첫번째와 trending page1을 가져온다.
    if(upNode.getAttribute('data')=='1'){
      getBtn('trending',1);
      carouselPosition(0);
    // 이슈탭 선택하면 캐러셀 포지션 두번째와 issue page1을 가져온다.
    }else if(upNode.getAttribute('data')=='2'){
      getBtn('issue',1);
      carouselPosition(1);
    // 엔터탭 선택하면 캐러셀 포지션 세번째와 enter page1을 가져온다.
    }else{
      getBtn('enter',1);
      carouselPosition(2);
    }
  }
}

// 더보기 버튼누르면 count증가하면서 page더 가져와서 str에 추가해주는 코드
var addItem = function(){
  // 더보기 누를 수록 count증가시켜서 원하는 데이터만 불러와서 추가하는 형식
  count +=1;
  // 만약 더보기 누를 시 active되어 있는 클래스를 토대로 원하는 데이터 더 가져오는 코드
  if(elemChoice.getAttribute('data')=='1'){
    getBtn('trending',count);
  }else if(elemChoice.getAttribute('data')=='2'){
    getBtn('issue',count);
  }else{
    getBtn('enter',count);
  }
}

//캐러셀 클릭시 동작 x축으로 position만큼 빼버리면서 이동
var carouselPosition = function(index){
    var carouselWrapper = findSelector('.carousel-wrapper');
    var position = index * -25;
    carouselWrapper.style.transform = 'translateX('+ position +'%)';
}

//click togleActive이벤트 추가하기
elemNav.addEventListener('click',togleActive, false);
elemBtn.addEventListener('click',addItem, false);
