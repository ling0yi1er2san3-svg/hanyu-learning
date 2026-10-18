import json, os
from pathlib import Path
ROOT=Path('/mnt/data/q3_translate_work/public/data-v2/book3')
T={
1:[
[
"Điền Phương, Thượng Hải thế nào? Tôi muốn đi tàu hỏa đến Thượng Hải du lịch.",
"Thượng Hải rất tốt, mấy năm nay thay đổi rất nhiều. Kỳ nghỉ hè năm nay tôi còn ở đó chơi hơn một tháng. Một người bạn học của tôi đang ở Thượng Hải.",
"Thượng Hải lớn hơn Bắc Kinh phải không?",
"Không, Thượng Hải không lớn bằng Bắc Kinh, nhưng dân số nhiều hơn Bắc Kinh. Thượng Hải là thành phố đông dân nhất Trung Quốc. Mấy năm nay xây thêm khá nhiều công trình mới, Thượng Hải đã trở nên đẹp hơn trước.",
"Công viên ở Thượng Hải có nhiều bằng ở Bắc Kinh không?",
"Công viên ở Thượng Hải không nhiều bằng ở Bắc Kinh, cũng không lớn bằng công viên ở Bắc Kinh.",
"Mùa đông ở Thượng Hải có phải ấm hơn Bắc Kinh một chút không?",
"Thượng Hải chưa chắc đã ấm hơn Bắc Kinh.",
"Nhưng tôi xem dự báo thời tiết, nhiệt độ ở Thượng Hải cao hơn Bắc Kinh nhiều.",
"Đúng, nhiệt độ ở Thượng Hải cao hơn Bắc Kinh mấy độ, nhưng vì trong nhà không có hệ thống sưởi nên cảm giác vẫn không ấm bằng Bắc Kinh.",
"Nhà người Thượng Hải không có hệ thống sưởi à?",
"Các gia đình bình thường thì không có, nhưng khách sạn và nhà hàng thì có."
],
[
"Thầy Vương, thầy có thích âm nhạc không?",
"Có chứ! Tôi là một người mê âm nhạc, riêng đĩa CD đã có mấy trăm chiếc rồi.",
"Tôi cũng rất thích âm nhạc, có lẽ còn thích hơn thầy. Thầy thích nhạc cổ điển hay nhạc hiện đại?",
"Tôi thích nhạc cổ điển, thích nghe những danh khúc nổi tiếng thế giới, cũng thích nghe dân ca.",
"Tôi cũng thích nhạc cổ điển. Thầy có thích nhạc pop không?",
"Nói thế nào nhỉ? Có lẽ không thích bằng người trẻ các bạn. Tôi thấy lời của nhạc pop viết không hay bằng dân ca.",
"Lời của một số bài hát pop vẫn viết khá hay mà.",
"Nhưng tôi vẫn thấy lời dân ca hay hơn. Bạn nghe dân ca của chúng tôi này: ‘Ở nơi xa xôi ấy, …’, viết hay biết bao!"
]
],
2:[
[
"Roland, nhiệt độ ở nước bạn khác Bắc Kinh phải không?",
"Tất nhiên là khác. Chỗ chúng tôi lệch Bắc Kinh tới bảy tiếng.",
"Chỗ bạn sớm hơn hay Bắc Kinh sớm hơn?",
"Bắc Kinh sớm hơn chỗ chúng tôi bảy tiếng. Bây giờ Bắc Kinh hơn tám giờ sáng, còn chỗ chúng tôi mới hơn một giờ đêm.",
"Các mùa có giống Bắc Kinh không?",
"Các mùa giống Bắc Kinh, cũng có bốn mùa xuân, hạ, thu, đông.",
"Khí hậu có giống Bắc Kinh không?",
"Không giống. Mùa hè Bắc Kinh rất nóng, chỗ chúng tôi mùa hè không nóng như vậy.",
"Mùa đông có lạnh không?",
"Mùa đông lạnh như Bắc Kinh, nhưng không thường có gió lớn.",
"Có thường xuyên có tuyết không?",
"Không những thường xuyên có tuyết mà còn rơi rất dày. Còn Bắc Kinh thì sao?",
"Mùa đông ở Bắc Kinh không thường có tuyết."
],
[
"Lần này bạn thi thế nào?",
"Cũng được. Môn tổng hợp được 95 điểm, nghe và đọc đều 90 điểm, nói thi không tốt lắm, chỉ được 85 điểm. Còn bạn?",
"Bạn thi tốt hơn tôi. Môn đọc của tôi bằng bạn, còn môn tổng hợp và nghe đều không tốt bằng bạn, chỉ được 80 điểm.",
"Phần nghe viết của tôi làm không tốt, có chữ Hán tôi không biết viết.",
"Thôi, không nói chuyện thi cử nữa. Tôi hỏi bạn, cuối tuần có dự định gì? Có ra ngoài chơi không?",
"Có. Gần đây tôi thường đến Bảo tàng Lịch sử tham quan.",
"Thế à? Sao bạn lại bắt đầu hứng thú với lịch sử vậy?",
"Sau khi học Kinh kịch, tôi bắt đầu hứng thú với lịch sử Trung Quốc. Có một hôm tôi mua được một cuốn sách tranh ở hiệu sách, giới thiệu về lịch sử Trung Quốc. Đọc xong tôi liền muốn đến Bảo tàng Lịch sử xem thử.",
"Bạn định nghiên cứu lịch sử Trung Quốc à?",
"Không, tôi chỉ hứng thú với lịch sử Trung Quốc thôi.",
"Tôi khác bạn. Bạn thích cái cũ, tôi thích cái mới. Tôi rất hứng thú với mọi thứ sau khi Trung Quốc cải cách mở cửa."
]
],
3:[
[
"À, nổi gió rồi. Hôm nay trời lạnh thật.",
"Mùa đông sắp đến rồi.",
"Tôi không thích mùa đông.",
"Tôi thích mùa đông. Tôi thích trượt băng, cũng thích trượt tuyết. Quê tôi có núi có sông, là khu thắng cảnh nổi tiếng. Mùa hè có thể bơi, mùa đông có thể trượt tuyết, bốn mùa quanh năm đều có khách du lịch, nhất là mùa hè, trong núi rất mát. Người đến tránh nóng đặc biệt đông. Nhiều gia đình sống nhờ du lịch, nhà hàng cũng phát triển khá nhiều.",
"Tôi chỉ biết trượt băng, không biết trượt tuyết. Tôi thật muốn đến quê bạn học trượt tuyết. Nhìn kìa, lá cây đều đỏ rồi! Lá đỏ đẹp quá. Đợi một chút, tôi đi nhặt mấy chiếc lá đỏ.",
"Đừng nhặt nữa, đi nhanh đi, sắp vào học rồi.",
"Vội gì chứ, còn sớm mà.",
"Bạn xem đồng hồ đi, mấy giờ rồi?",
"Mới bảy giờ rưỡi.",
"Gì cơ? Đồng hồ của bạn có phải hỏng rồi không?",
"Ôi, đồng hồ của tôi dừng rồi. Có lẽ hết pin, phải thay pin rồi. Bây giờ mấy giờ?",
"Đã bảy giờ năm mươi rồi. Đi nhanh đi, không nhanh nữa là muộn đấy."
],
[
"Yamamoto, có chuyện gì vui à? Sao vui thế?",
"Mẹ tôi gửi thư đến. Trong thư bà vui vẻ nói rằng chị tôi tháng sau sắp kết hôn rồi.",
"Lần trước bạn nói chị bạn vừa tìm được việc, sao nhanh thế đã kết hôn rồi?",
"Vị hôn phu của chị ấy không muốn chị ấy đi làm nữa.",
"Nói vậy là sau khi kết hôn chị ấy sẽ không đi làm nữa à?",
"Đúng.",
"Sau này bạn cũng sẽ như vậy sao? Kết hôn rồi là không đi làm nữa à?",
"Không. Tôi thích làm việc. Nếu không cho tôi đi làm thì tôi sẽ không kết hôn."
]
],
4:[
[
"Có phải thầy Vương không? Em là Tiểu Lâm đây.",
"À, Tiểu Lâm. Chẳng phải em đi Đài Loan dự hội thảo giảng dạy tiếng Hán sao?",
"Em họp xong về rồi. Tối qua vừa mới về đến nhà. Lúc về em đi qua Hồng Kông, có ghé nhà Tiểu Ngụy thăm một chút.",
"Thế à? Tiểu Ngụy có khỏe không?",
"Rất khỏe. Cô ấy nhờ em gửi lời hỏi thăm thầy, còn nhờ em mang cho thầy ít đồ. Em định mang sang cho thầy.",
"Để tôi qua lấy vậy.",
"Không cần đâu. Em đúng lúc phải xuống lầu, tiện thể mang sang cho thầy luôn.",
"Thế cũng được, em qua đây nhé.",
"Vất vả cho em rồi! Lại còn phiền em đi một chuyến. Bên ngoài lạnh, mau vào nhà ngồi đi.",
"Em không vào đâu. Chồng em vẫn đang đợi dưới lầu, chúng em còn phải đi làm chút việc.",
"Cho tôi gửi lời cảm ơn chồng em.",
"Không cần cảm ơn đâu, thầy vào đi ạ.",
"Đi cẩn thận nhé!"
],
[
"Các bạn ở dưới mau lên xe đi, sắp chạy rồi.",
"Thưa cô, em không lên đây nữa, em sang xe số 5 phía sau được không? Bạn em ở đó.",
"Em sang đó đi. Sao Mary vẫn chưa lên nhỉ?",
"Cô ấy quên mang máy ảnh, lại quay về ký túc xá lấy rồi, lát nữa sẽ về. À, cô ấy chạy tới rồi. Mary, nhanh lên, sắp chạy xe rồi.",
"Xin lỗi, em đến muộn.",
"Mary, ở đây còn chỗ, qua đây ngồi đi.",
"Mọi người chú ý, tôi nói trước một việc. Hôm nay chúng ta đi tham quan triển lãm di vật khai quật. Cuộc tham quan này khoảng hai tiếng rưỡi. Tham quan xong, bốn giờ xe chạy về. Yêu cầu mọi người đúng bốn giờ phải lên xe. Ai không về thì báo tôi một tiếng. Đã nghe rõ chưa?",
"Nghe rõ rồi.",
"Phải nhớ giờ xe chạy. Mọi người lên hết chưa? Được rồi, bác tài, chạy xe đi.",
"Thưa cô, cô qua đây ngồi đi ạ.",
"Cô không qua đâu, ngồi đây được rồi, em mau ngồi xuống đi.",
"Thưa cô, sau khi tham quan xong em muốn đến đại sứ quán thăm bạn, không về trường, được không ạ?",
"Được."
]
]
}

def apply(lesson, blocks):
    p=ROOT/f'lesson{lesson:02}.json'
    d=json.load(open(p,encoding='utf-8'))
    dias=d.get('dialogues',[])
    assert len(dias)==len(blocks),(lesson,len(dias),len(blocks))
    for di,(dia,tr) in enumerate(zip(dias,blocks),1):
        lines=dia.get('lines',[])
        assert len(lines)==len(tr),(lesson,di,len(lines),len(tr))
        for line,vi in zip(lines,tr):
            line['vietnamese']=vi
            line['vietnameseStatus']='assistant_translation'
    ver=d.setdefault('verification',{})
    ver['translationCoverageComplete']=True
    ver['translationSourceVerified']=False
    ver['translationMethod']='assistant_translation'
    json.dump(d,open(p,'w',encoding='utf-8'),ensure_ascii=False,indent=2)

for lesson,blocks in T.items(): apply(lesson,blocks)
print('applied lessons',sorted(T))
T2={
5:[
[
"Edward, cảm của bạn khỏi chưa?",
"Đỡ nhiều rồi. Từ khi đến Trung Quốc tôi đã bị cảm ba lần rồi.",
"Tôi thì chưa từng bị bệnh lần nào.",
"Sức khỏe của bạn tốt thật. Tôi còn từng nằm viện một lần, khám Đông y và cũng đã uống thuốc Đông y.",
"Nghe nói thuốc Đông y rất đắng, phải không?",
"Có loại đắng, có loại không đắng. Loại tôi uống là thuốc Đông y bào chế sẵn, ngọt ngọt, không đắng chút nào. Uống những thuốc này xong bệnh của tôi khỏi luôn.",
"Tôi nghe nói Đông y khám bệnh rất thú vị.",
"Đông y khám bệnh không xét nghiệm, chỉ dùng tay bắt mạch một chút rồi kê đơn thuốc cho bạn. Còn dùng các phương pháp như xoa bóp, châm cứu để chữa bệnh.",
"Tôi từng tiêm rồi à?",
"Không phải tiêm, mà là châm kim.",
"Bạn đã từng châm cứu chưa?",
"Tôi từng xoa bóp, chưa từng châm cứu, nhưng đã từng nhìn thấy.",
"Kim như thế nào vậy?",
"Là một loại kim rất rất nhỏ.",
"Tôi chưa từng thấy."
],
[
"Yamamoto, nghe nói trước đây bạn từng đến Trung Quốc rồi phải không?",
"Đúng, đã đến một lần. Còn bạn?",
"Tôi chưa từng đến, đây là lần đầu tiên. Bạn đã đi những đâu rồi?",
"Tôi đã đi khá nhiều nơi. Phía bắc từng đến Cáp Nhĩ Tân, phía nam từng đến đảo Hải Nam, phía đông từng đến Thái Sơn, phía tây từng đến Tây An và Đôn Hoàng.",
"Bạn đi thật nhiều nơi. Từ khi đến Trung Quốc, tôi chỉ từng đi Di Hòa Viên, Cố Cung và Vạn Lý Trường Thành.",
"Bạn đã quen ăn món Trung Quốc chưa?",
"Quen từ lâu rồi.",
"Bạn đã ăn những món Trung Quốc nào?",
"Ăn nhiều rồi. Tôi thích nhất là vịt quay Bắc Kinh. Bạn thích ăn gì?",
"Món Trung Quốc tôi đều thích. Còn thích ăn kẹo hồ lô và những thứ tương tự.",
"Bạn đã xem Kinh kịch chưa?",
"Chưa. Nghe nói Kinh kịch rất thú vị, tôi rất muốn đi xem."
],
[
"Edward, bạn nói bạn là người mê âm nhạc, bạn đã nghe nhạc Trung Quốc chưa?",
"Tất nhiên là đã nghe rồi!",
"Đã nghe gì?",
"Khi ở Canada, tôi thường nghe bản concerto piano ‘Hoàng Hà’ do một nghệ sĩ piano Trung Quốc biểu diễn.",
"Bạn thấy thế nào?",
"Hay tuyệt! Thật muốn nghe lại một lần nữa.",
"Bạn đã nghe concerto violin ‘Lương Chúc’ chưa?",
"Tôi đã nghe nói đến nhưng chưa nghe. Có hay không?",
"Bạn nghe rồi sẽ biết.",
"Tôi rất muốn nghe thử, chỗ bạn có đĩa không?",
"Có.",
"Cho tôi mượn nghe nhé.",
"Bạn cứ cầm đi. Nghe xong thì trả tôi.",
"Nhất định. Mượn dễ trả dễ thì lần sau mới dễ mượn mà."
]
],
6:[
[
"Thầy Vương, chào thầy! Lâu rồi không gặp.",
"Chào em! Denise, em đến khi nào vậy?",
"Mới đến hôm kia.",
"Đến để học à?",
"Không, đến du lịch.",
"Đi một mình à?",
"Không, em đến cùng đoàn du lịch. Em làm phiên dịch, cũng làm hướng dẫn viên.",
"Em đã đi làm rồi à?",
"Chưa, em vẫn đang học cao học.",
"Là đi làm thêm à?",
"Vâng, em tranh thủ kỳ nghỉ làm thêm ở một công ty du lịch. Họ tổ chức một đoàn du lịch, ông chủ bảo em đi cùng họ. Ông ấy biết em cần sang Trung Quốc thu thập tài liệu nên hễ có đoàn nào sang Trung Quốc là lại sắp xếp cho em đi cùng đoàn.",
"Ông chủ này quả thật rất tốt.",
"Vâng. Ông ấy giúp em rất nhiều.",
"Em đã đi nơi nào khác chưa?",
"Rồi ạ. Trước tiên chúng em chơi ở Hồng Kông ba ngày, sau đó đi Thâm Quyến, rồi từ Thâm Quyến sang đây.",
"Đến bằng máy bay à?",
"Không, đến bằng tàu hỏa. Mọi người trong đoàn đều muốn thử đi tàu hỏa Trung Quốc và ngắm phong cảnh hai bên đường sắt.",
"Khi nào về?",
"Đoàn du lịch ngày kia sẽ về. Em đã bàn với ông chủ là sẽ về muộn vài ngày, em muốn đến quê hương của Khổng Tử một chuyến. Chiều nay là thời gian hoạt động tự do nên em đến thăm thầy.",
"Ở đây ăn cơm tối rồi hãy đi nhé."
],
[
"Mike, tiếng Trung của bạn học ở đâu vậy?",
"Học ở Mỹ.",
"Học bao lâu rồi?",
"Tôi mãi đến kỳ nghỉ hè năm ngoái mới bắt đầu học tiếng Trung, đã học hơn một năm rồi.",
"Học ở đại học à?",
"Không, học ở một trường ngôn ngữ.",
"Là giáo viên Trung Quốc dạy à?",
"Có giáo viên Trung Quốc, cũng có giáo viên Mỹ. Bạn thấy tôi nói tiếng Trung thế nào?",
"Tạm được thôi. Người Trung Quốc vừa nghe là biết ngay bạn là người nước ngoài.",
"Nhìn cũng biết tôi là người nước ngoài mà: mũi cao, tóc vàng, mắt xanh. Tôi biết phát âm và thanh điệu của tôi đều chưa tốt lắm.",
"Chúng ta giúp nhau nhé? Tôi giúp bạn luyện tiếng Trung, mong bạn giúp tôi luyện tiếng Anh.",
"Được thôi. Nhưng tiếng Anh của tôi cũng chỉ tạm được.",
"Gì cơ? Bạn chẳng phải người Mỹ sao?",
"Bố tôi là người Mỹ, mẹ tôi là người Ý, đến năm mười tuổi tôi mới sang Mỹ. Tôi có thể làm giáo viên của bạn không?",
"Tạm được thôi.",
"Đừng chỉ nói ‘tạm được’, chúng ta đều phải học nghiêm túc."
]
],
7:[
[
"Hộ chiếu của tôi bạn tìm thấy chưa?",
"Chưa, tôi tìm cả buổi mà vẫn không thấy. Có phải bạn để ở văn phòng không?",
"Hộ chiếu tôi chưa bao giờ để trong văn phòng.",
"Hôm qua lúc làm visa bạn để ở đâu?",
"Để trong túi xách của tôi.",
"Túi của bạn đâu?",
"Vừa về đến nhà chẳng phải tôi đã đưa cho bạn rồi sao?",
"Đúng. Để tôi tìm kỹ lại. À, tìm thấy rồi!",
"Tìm thấy trong túi à?",
"Không, tìm thấy trong túi áo khoác của bạn.",
"À, tôi quên mất. Tối qua chính tôi bỏ vào túi áo.",
"Gần đây bạn lúc nào cũng đãng trí, hay quên trước quên sau."
],
[
"Bạn thích bóng đá không?",
"Bình thường. Còn bạn?",
"Bạn không nhận ra à? Tôi là fan bóng đá đấy.",
"Mê đến mức nào?",
"Để xem bóng, cơm tôi có thể không ăn, ngủ tôi có thể không ngủ, việc tôi có thể không làm.",
"Tôi thấy fan bóng đá ai nấy đều hơi không bình thường.",
"Tôi cũng thừa nhận. Có lúc mê đến mức phát cuồng. Trong mùa giải châu Âu, tôi như bị bệnh vậy. Ban ngày muốn ngủ, cứ đến tối lại đặc biệt tỉnh táo.",
"Ban ngày bạn không đi làm à?",
"Cửa hàng này do tôi tự mở, tôi dán một thông báo lên cửa: ‘Tạm ngừng kinh doanh’.",
"Bạn đúng là mê thật đấy.",
"Tôi vẫn chưa phải là người mê nhất đâu.",
"Còn có người mê hơn bạn nữa à?",
"Có, nhiều lắm. Tôi có một người bạn làm ở công ty nước ngoài. Để có thể ra nước ngoài tận mắt xem World Cup, anh ấy xin nghỉ phép với ông chủ; ông chủ không cho, thế là anh ấy nghỉ việc luôn.",
"Cuối cùng có đi được không?",
"Đi được. Tôi thật sự phục anh ấy. Có thể tận mắt xem World Cup thì tuyệt quá."
]
],
8:[
[
"Những bức ảnh chúng ta chụp ở Vạn Lý Trường Thành rửa xong chưa?",
"Rửa xong rồi.",
"Chụp thế nào? Mau cho tôi xem.",
"Mấy tấm này chụp rất đẹp, kỹ thuật chụp ảnh của Trương Đông khá tốt. Mấy tấm này chụp không được đẹp lắm.",
"Tấm này cũng tạm được, người hơi nhỏ một chút. Bạn xem tấm này nữa, mắt nhắm hết rồi, giống như đang ngủ vậy.",
"Tấm này sao vậy?",
"Không đẹp lắm. Rửa không tốt, màu hơi đậm. Hai tấm này rửa đẹp nhất, giống tranh sơn dầu vậy.",
"Phóng to thêm hai tấm đi.",
"Phóng cỡ bao nhiêu? Phóng to gấp đôi thế nào?",
"Phóng cỡ mười xăng-ti-mét là được."
],
[
"Ôi, suýt nữa thì muộn.",
"Bạn lái xe đến phải không?",
"Đúng, hễ tuyết rơi là tắc đường, lại còn gặp một vụ tai nạn giao thông. Chiếc xe đó bị kẹt trên đường đúng hai mươi phút.",
"Kính của bạn làm sao vậy?",
"Đừng nhắc nữa, hôm nay xui quá. Tôi vừa ra khỏi nhà đã ngã một cú, kính cũng rơi xuống đất vỡ mất.",
"Mấy giờ bạn ra khỏi nhà?",
"Sáu giờ đã ra khỏi nhà rồi, bạn xem, gần tám giờ mới đến. Vì thế tôi vẫn thích đi xe đạp đi làm hơn, đi xe đạp có thể đảm bảo thời gian, lại còn rèn luyện sức khỏe.",
"Nhưng bạn đừng quên, người đi xe đạp quá nhiều, lại có người không tuân thủ luật giao thông, đó cũng là một trong những nguyên nhân chính gây ùn tắc giao thông. Tai nạn hôm nay chính là do một chiếc xe đạp gây ra.",
"Người có ô tô cũng có chút cảm giác bất an; giao thông đô thị là một vấn đề lớn.",
"Theo tôi tốt nhất là nhanh chóng phát triển tàu điện ngầm."
]
]
}
for lesson,blocks in T2.items(): apply(lesson,blocks)
print('applied lessons',sorted(T2))
