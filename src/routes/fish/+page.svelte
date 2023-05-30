<script>
    import { Button, Dropdown, DropdownItem, Chevron, Radio } from 'flowbite-svelte'
    import img1 from '$lib/images/ikan1.jpg';
    
    let user = {
        ageRange: 0
    }

    let group1 = user.ageRange;
    
    let options = [
        {value: 0, text: '13-16'},
        {value: 1, text: '17-19'},
        {value: 2, text: '20-22'},
        {value: 3, text: '22+'},
    ];

    let dropdownText = options[group1].text;

    const onChangeAgeRange = () => {
        user.ageRange = group1;
        dropdownText = options.find(option => option.value === group1).text;
    }
    
    const menus = [
        {
            title: 'FISH',
            href: '/fish'
        },
        {
            title: 'UTILITY',
            href: '/utility'
        },
        {
            title: 'CART',
            href: '/cart'
        },
        {
            title: 'SELL',
            href: '/sell'
        },
        {
            title: 'LOGIN',
            href: '/login'
        }
    ];
</script>

<div class="h-screen w-full bg-no-repeat text-black" style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('{img1}');background-attachment:fixed">
    <div class="flex">
        <div>
            <Button><Chevron>{dropdownText}</Chevron></Button>
            <Dropdown class="w-44 p-3 space-y-3 text-sm">
            {#each options as option (option.value)}
                <li>
                    <Radio name="group1" bind:group={group1} value={option.value} on:change={onChangeAgeRange}>{option.text}</Radio>
                </li>
            {/each}
            </Dropdown>
        </div>
        <div>

        </div>
    </div>
</div>
