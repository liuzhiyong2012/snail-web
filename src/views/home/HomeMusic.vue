<template>
  <div>
    <h2 class="abus_block_title">
      <van-cell title="Music" class="block_title_background">
        <template #right-icon>
          <van-icon name="ellipsis" style="line-height: inherit;" size="25" />
        </template>
      </van-cell>
    </h2>
    <div class="music-box">
      <div class="music-list">
        <div class="music-l">
          <!-- <img src="" alt=""> -->
        </div>
        <div class="f1">
          <div class="music-name">Name</div>
          <div class="music-author">suthor</div>
        </div>
        <van-icon name="play-circle" color="rgb(229,232,228)" size="20"/>
      </div>
      <div class="music-list">
        <div class="music-l">
          <!-- <img src="" alt=""> -->
        </div>
        <div class="f1">
          <div class="music-name">Name</div>
          <div class="music-author">suthor</div>
        </div>
        <van-icon name="play-circle" color="rgb(229,232,228)" size="20"/>
      </div>
      <div class="music-list">
        <div class="music-l">
          <!-- <img src="" alt=""> -->
        </div>
        <div class="f1">
          <div class="music-name">Name</div>
          <div class="music-author">suthor</div>
        </div>
        <van-icon name="play-circle" color="rgb(229,232,228)" size="20"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.block_title_background {
  background-color: #fafafa00;
}
.van-cell {
  font-size: 18px;
}
.music-box {
  background-color: #fff;
  padding: 0 14px ;
  margin: 0 14px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #efefef;
  :last-child{
      border-bottom: none;
  }
}
.music-list {
  display: flex;
  padding: 14px 0;
  border-bottom: 1px solid #efefef;
  align-items: center;
  .music-l {
    width: 50px;
    height: 50px;
    background-color: darkorange;
    border-radius: 6px;
  }
 
  .f1 {
    flex: 1;
    margin: 0 0 0 8px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    .music-name {
      flex: 1;
      font-size: 14px;
      color: #666;
      line-height: 25px;
    }
    .music-author {
      flex: 1;
      font-size: 12px;
      color: #999;
      line-height: 25px;
    }
  }
}
</style>