<template>
    <div :class="$style.pending">
        <img :src="require('~/assets/svg/download.svg')" />
    </div>
</template>

<style lang="scss" module>
.pending {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        width: 50%;
        max-width: 400px;
    }
}
</style>
