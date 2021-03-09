<script language="JavaScript">

var nl = getNewLine()

function getNewLine() {
	var agent = navigator.userAgent

	if (agent.indexOf("Win") >= 0)
		return "\r\n"
	else
		if (agent.indexOf("Mac") >= 0)
			return "\r"

 	return "\r"

}

pagecode = 'import time'+nl+
	'import random'+nl+
	'import string'+nl+
	'from threading import *'+nl+
	'from selenium import webdriver'+nl+
	'from selenium.webdriver.chrome.options import Options'+nl+nl+
	'playerMinThreshold = 3 #Enter the minimum player threshold you desire (Note that the threshold includes the bot as well)'+nl+
	'driverDirectory = \'/Users/michaelshum/Desktop/dumb_python_scripts/WebDrivers/chromedriver\' #Put the directory of the chromedriver here.'+nl+
	'url = \'https://skribbl.io\''+nl+nl+
	'disconnect = False'+nl+
	'd_reason = 1'+nl+
	'pause = False'+nl+
	'endthreads = False'+nl+
	'kicked = False'+nl+nl+
	'print(\'\\nEntering skribbl.io...\')'+nl+nl+
	'def chatupdates():'+nl+
	'	global chatLogHistory'+nl+
	'	global chatLogLatest'+nl+
	'	global pause'+nl+
	'	global playerCount'+nl+
	'	global endthreads'+nl+nl+
	'	kicked = False'+nl+
	'	endthreads = False'+nl+
	'	playerCountStore = playerCount'+nl+
	'	chatLogHistory = \'\''+nl+
	'	'+nl+
	'	print(\'==============================\')'+nl+
	'	print(\'[SHOWING CHAT NOW]\')'+nl+nl+
	'	while (endthreads != True) and (kicked != True):'+nl+
	'		playerCount = (driver.find_element_by_xpath(\'//*[@id="containerGamePlayers"]\')).size[\'height\'] / 48'+nl+
	'		if playerCount != playerCountStore:'+nl+
	'			print(\'\\n[{} PLAYERS IN GAME.]\\n\').format(playerCount)'+nl+
	'			playerCountStore = playerCount'+nl+
	'		chatLogLatest = (driver.find_element_by_xpath(\'//*[@id="boxMessages"]/p[last()]\').text)'+nl+
	'		if (chatLogLatest == "Spam detected! You\'re sending too many messages."):'+nl+
	'			pause = True'+nl+
	'			chatLogLatest = \'\''+nl+
	'		else:'+nl+
	'			pause = False'+nl+
	'		if (\'is drawing now!\' in chatLogLatest):'+nl+
	'			driver.find_element_by_xpath(\'//*[@id="containerPlayerlist"]/div[2]\').click()'+nl+nl+
	'		chatLog = (driver.find_element_by_xpath(\'//*[@id="boxMessages"]\').text)'+nl+
	'		if chatLogHistory != chatLog:'+nl+
	'			print(chatLog.replace(chatLogHistory,\'\').strip(\'\\n\'))'+nl+
	'		chatLogHistory = chatLog'+nl+nl+
	'	print(\'[STOPPED SHOWING CHAT]\')'+nl+
	'	print(\'==============================\')'+nl+nl+
	'def chatSend(theString):'+nl+
	'	driver.find_element_by_xpath(\'//*[@id="inputChat"]\').send_keys(theString)'+nl+
	'	driver.find_element_by_xpath(\'//*[@id="inputChat"]\').submit()'+nl+nl+
	'def randomString(stringLength):'+nl+
	'	lettersAndDigits = string.ascii_letters + string.digits'+nl+
	'	return \'\'.join(random.choice(lettersAndDigits) for i in range(stringLength))'+nl+nl+
	'def disconnectCheck(): #Function to determine if the bot should disconnect.'+nl+
	'	global disconnect'+nl+
	'	global d_reason'+nl+
	'	global kicked'+nl+nl+
	'	disconnect = False'+nl+
	'	kicked = False'+nl+nl+
	'	while (disconnect == False) and (kicked != True):'+nl+
	'		try:'+nl+
	'			playerCount = (driver.find_element_by_xpath(\'//*[@id="containerGamePlayers"]\')).size[\'height\'] / 48'+nl+
	'		except:'+nl+
	'			playerCount = 0'+nl+
	'		if (playerCount < playerMinThreshold) and (playerCount != 0):'+nl+
	'			disconnect = True'+nl+
	'			print(\'\\n[NOT ENOUGH PLAYERS IN THE GAME! PREPARING TO LEAVE...]\\n\')'+nl+
	'			d_reason = 1'+nl+
	'		elif (driver.find_element_by_xpath(\'//*[@id="overlay"]/div\').get_attribute(\'style\') == "bottom: 0%;") and (driver.find_element_by_xpath(\'//*[@id="overlay"]/div/div[1]\').text == "Choose a word"):'+nl+
	'			disconnect = True'+nl+
	'			print(\'\\n[YOU WERE CHOSEN TO DRAW! PREPARING TO LEAVE...]\\n\')'+nl+
	'			d_reason = 2'+nl+
	'		else:'+nl+
	'			disconnect = False'+nl+nl+
	'		if playerCount == 0:'+nl+
	'			print(\'\\n[YOU WERE KICKED BY THE SERVER! FINDING A NEW GAME]\\n\')'+nl+
	'			kicked = True'+nl+
	'		else:'+nl+
	'			kicked = False'+nl+nl+
	'def chatSpam(): #Chat spam function'+nl+
	'	global pause'+nl+
	'	global endthreads'+nl+nl+
	'	while (kicked != True) and (disconnect == False):'+nl+
	'		chatSend(randomString(random.randint(1,99)))'+nl+
	'		if disconnect == False:'+nl+
	'			if pause == True:'+nl+
	'				print \'[PAUSING...]\''+nl+
	'				time.sleep(5)'+nl+
	'			else:'+nl+
	'				time.sleep(0.85)'+nl+nl+
	'	if kicked != True:'+nl+
	'		if d_reason == 2:'+nl+
	'			chatSend("Sorry, I wasn\'t made to draw. I was made only to spam.")'+nl+
	'		if d_reason == 1:'+nl+
	'			chatSend("You guys suck. I\'m outta here.")'+nl+
	'		chatSend(\'Your terror with me is now over. Take care now!\')'+nl+
	'	td.join()'+nl+
	'	time.sleep(2)'+nl+
	'	endthreads = True'+nl+
	'	tc.join()'+nl+nl+
	'def gameSearch():'+nl+
	'	global tryCount'+nl+
	'	global playerCount'+nl+nl+
	'	tryCount = 0'+nl+
	'	while True:'+nl+
	'		if (tryCount % 15 == 0) and (tryCount != 0):'+nl+
	'			print(\'\\nRestarting browser in an attempt to find a game more quickly...\\n\')'+nl+
	'			driver.quit()'+nl+
	'			initfunc()'+nl+
	'			driver.find_element_by_xpath(\'//*[@id="formLogin"]/button[1]\').click()'+nl+
	'		elif (tryCount == 0):'+nl+
	'			print(\'\\n==============================\')'+nl+
	'			print(\'Starting game search...\')'+nl+
	'			driver.refresh()'+nl+
	'			driver.find_element_by_xpath(\'//*[@id="formLogin"]/button[1]\').click()'+nl+
	'		else:'+nl+
	'			driver.refresh()'+nl+
	'			driver.find_element_by_xpath(\'//*[@id="formLogin"]/button[1]\').click()'+nl+
	'		time.sleep(8)'+nl+
	'		playerCount = (driver.find_element_by_xpath(\'//*[@id="containerGamePlayers"]\')).size[\'height\'] / 48'+nl+
	'		tryCount = tryCount + 1'+nl+
	'		if (playerCount == 0) and (driver.find_element_by_xpath(\'//*[@id="preroll"]\').get_attribute(\'style\').find("block;") > -1):'+nl+
	'			print(\'[Attempt \'),tryCount,(\']: An ad played. Searching for a new game...\')'+nl+
	'		elif (playerCount < playerMinThreshold):'+nl+
	'			if playerCount == 0:'+nl+
	'				playerCount = 1'+nl+
	'			print(\'[Attempt \'),tryCount,(\']: Game is below minimum player threshold (Threshold:\'),playerMinThreshold,(\'- Player Count:\'), playerCount,(\'). Searching for a new game...\')'+nl+
	'			chatSend(\'Just passing through...\')'+nl+
	'		else:'+nl+
	'			joinedGameStart()'+nl+
	'			break'+nl+nl+
	'def joinedGameStart():'+nl+
	'	global tryCount'+nl+
	'	global chatLogHistory'+nl+
	'	global tc'+nl+
	'	global td'+nl+
	'	print(\'[Attempt \'),tryCount,(\']: Found a game above threshold with \'),playerCount,(\' players! Initiating spam...\\n\')'+nl+
	'	chatSend(\'Hey there. I am spamBot. I am here to make this game hell for you.\') #Feel free to change this line.'+nl+
	'	chatSend(\'Please enjoy hell with me! *If you copy me, you will probably get kicked.\') #Feel free to change this line.'+nl+
	'	time.sleep(2.5)'+nl+
	'	if playerCount > 2:'+nl+
	'		driver.find_element_by_xpath(\'//*[@id="containerPlayerlist"]/div[2]\').click()'+nl+nl+
	'	tc = Thread(target=chatupdates, name=\'chat-update-thread\')'+nl+
	'	tc.start()'+nl+nl+
	'	td = Thread(target=disconnectCheck, name=\'disconnect-check-thread\')'+nl+
	'	td.start()'+nl+nl+
	'def initfunc():'+nl+
	'	chrome_options = Options()'+nl+
	'	chrome_options.add_argument("--headless")'+nl+
	'	chrome_options.add_argument("--mute-audio")'+nl+
	'	global driver'+nl+
	'	driver = webdriver.Chrome(executable_path=driverDirectory, chrome_options=chrome_options) #Change the directory to where your chromedriver is located.'+nl+
	'	driver.implicitly_wait(15) '+nl+
	'	driver.get(url)'+nl+
	'	driver.find_element_by_xpath(\'//*[@id="inputName"]\').send_keys(\'spamBot\') #Feel free to change the name.'+nl+
	'	time.sleep(1)'+nl+
	'	driver.find_element_by_xpath(\'/html/body/div[2]/div/a[1]\').click()'+nl+nl+
	'#Bot function'+nl+
	'initfunc()'+nl+
	'while True:'+nl+
	'	gameSearch()'+nl+
	'	time.sleep(1)'+nl+
	'	chatSpam()'

document.write(pagecode);

</script>
