<template>
    <div class="abus-height">
        <div class="cell-group">
            <div class="header"></div>
            <div class="main"></div>
            <div class="footer">
                <div class="time">213213123</div>
                <div class="money">1232131231</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.cell-group{
    background: #fff;
    box-shadow: 0 0 0.1rem #efefef;
    .header{
        
    }
    .main{

    }
    .footer{
        display: flex;
        padding: 0 .3rem;
        line-height: .8rem;
        .time{
            font-size: .28rem;
            color: #999;
        }
        .money{
            flex: 1;
            text-align: right;
            font-size: 0.32rem;
            font-weight: bold;
        }
    }
}
</style>