return {
    changeCharacterCommand = "changecharacter", -- this is the command to open the ui again and change your character, set to false if you want to disable.

    characterLimit = 5, -- max amount of characters that a player can create.

    logo = "https://img.thestoicbear.dev/images/Stoic-2024-11-01_18-40-35-672520a370e3e.png-", -- character screen logo.

    backgrounds = { -- background will randomly be set to one of these images.
        "https://cdn.discordapp.com/attachments/982855421779922944/1211787543960363008/multnomah-falls-oregon-forest-waterfalls-green-moss-rocks-4545x3456-6387.jpg?ex=65ef7818&is=65dd0318&hm=a12716869c3fccc8aba10efbabc63509211d6d1f14e2ef66889791828298519b&",
        "https://cdn.discordapp.com/attachments/982855421779922944/1211787549786382427/1.png?ex=65ef7819&is=65dd0319&hm=4e25086ce1dae100cefcf7d47ede48769fb485d53cffa2e1c778c050e62a2b95&",
        "https://cdn.discordapp.com/attachments/982855421779922944/1211787551816417360/2.png?ex=65ef781a&is=65dd031a&hm=0b51e7979540c9dba98f4c148ef67bc094a80ba227f66e5deb0503d4d07c5bc3&",
		"https://cdn.discordapp.com/attachments/982855421779922944/1211787557466013707/3.png?ex=65ef781b&is=65dd031b&hm=4e2e2183ae5dd66e5eda71a39e777209ec9a23bd208c0458dfd3a7f8db0a8cf0&",
		"https://cdn.discordapp.com/attachments/982855421779922944/1211787565288525886/mount-hood-oregon-alpenglow-sunset-pink-sky-mountain-peak-3840x2400-4264.jpg?ex=65ef781d&is=65dd031d&hm=856cc28fe4e4804cc95988705bc778c08d4dc4189b74f5a7f482ae091dc40826&",
		"https://cdn.discordapp.com/attachments/982855421779922944/1211787570648846356/haystack-rock-sunset-oregon-rocky-coast-cliff-seascape-3840x2400-4272.jpg?ex=65ef781e&is=65dd031e&hm=6c44a664d6bfe40cdda329d55ba41d2b6e38012565310d597bbe55b1aafbfc7d&"
    },
    colors = {
        backdrop = "bg-black opacity-70",
        overlay = "bg-gray-900 ring-purple-500 ring-opacity-70",
        buttonNewCharacter = "bg-blue-600 hover:bg-indigo-700",
        buttonQuitGame = "bg-red-600 hover:bg-red-700",
        buttonCreateCharacter = "bg-green-600",
        buttonCancelCharacter = "bg-gray-600",
        buttonDoNotTeleport = "bg-indigo-600",
        buttonCancelTeleport = "bg-gray-600",
        buttonExitConfirm = "bg-green-600",
        buttonExitCancel = "bg-gray-600",
        buttonDeleteConfirm = "bg-green-600",
        buttonDeleteCancel = "bg-gray-600",
        -- Add more colors as needed
    },
    startingMoney = {
        cash = 2500,
        bank = 8000
    },

}
