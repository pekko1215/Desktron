#include<stdio.h>
#include<string.h>
int main(int argc, char const *argv[])
{
	char text[256];
	printf("合言葉は？->");
	fflush(stdout);
	scanf("%s",text);
	if(!strcmp(text,"ぞば")){
		printf("正解！\n");
		fflush(stdout);
	}else{
		printf("ちがうよ\n");
		fflush(stdout);
	}
	return 0;
}