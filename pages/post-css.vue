<template>
    <div class="postcss-test">
        <h1 class="title">
            PostCSS 測試
        </h1>

        <div class="card">
            <div class="card__header">
                <h2>特性展示</h2>
            </div>

            <div class="card__content">
                <div class="feature-grid">
                    <div class="feature-item">
                        <span class="feature-item__label">巢狀 CSS</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-item__label">PX 轉 REM</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-item__label">自動前綴</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-item__label">現代 CSS 特性</span>
                    </div>
                </div>
            </div>

            <div class="custom-properties">
                <p>Custom Properties 測試</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ name: 'post-css' });
</script>

<style lang="scss" scoped>
/* 定義 CSS 變數 */
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --spacing: 16px;
    --border-radius: 8px;
}

.postcss-test {
    /* px 會自動轉換為 rem */
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;

    /* 測試巢狀 CSS */
    & .title {
        font-size: 32px;
        color: var(--primary-color);
        margin-bottom: var(--spacing);

        &:hover {
            color: var(--secondary-color);
        }
    }
}

.card {
    background: white;
    border-radius: var(--border-radius);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    /* 巢狀語法 */
    & .card__header {
        padding: var(--spacing);
        border-bottom: 1px solid #eee;

        & h2 {
            margin: 0;
            font-size: 24px;
        }
    }

    & .card__content {
        padding: var(--spacing);
    }
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing);

    /* 測試現代 CSS 特性 */
    @supports (display: grid) {
        & {
            display: grid;
        }
    }
}

.feature-item {
    padding: 16px;
    background: #f8f9fa;
    border-radius: var(--border-radius);
    /* 自動添加瀏覽器前綴 */
    user-select: none;

    /* 測試轉換單位 */
    min-height: 100px;

    /* 漸變效果，會自動添加前綴 */
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-2px);
    }

    &__label {
        font-weight: bold;
        color: var(--primary-color);
    }
}

.custom-properties {
    padding: var(--spacing);
    /* 使用 rgba 或 opacity 来实现透明效果 */
    background: rgba(52, 152, 219, 0.1); /* 使用 rgba 直接设置透明度 */
    /* 或者使用现代的 CSS color function */
    background: rgb(from var(--primary-color) r g b / 0.1);

    /* 使用 CSS 自定义属性 */
    --local-color: #9b59b6;

    & p {
        color: var(--local-color);
        font-weight: bold;
    }
}
</style>
